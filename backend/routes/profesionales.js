const express = require('express');
const router = express.Router();
const db = require('../base-orm/pg-init'); // Cambiado a pg-init
const { Op, ValidationError } = require("sequelize");
const auth = require('../seguridad/auth');
require('dotenv').config();

router.get("/api/profesionales", async (req, res) => {
    let where = {};
    if (req.query.nombre != undefined && req.query.nombre !== "") {
        where.Nombre = { // Nota: cambiado a Nombre con mayúscula para coincidir con el modelo
            [Op.iLike]: "%" + req.query.nombre + "%", // iLike para PostgreSQL (case-insensitive)
        };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
        where.Activo = req.query.Activo === "true";
    }
    const pagina = req.query.pagina ?? 1;
    const tamañoPagina = 6;

    try {
        const { count, rows } = await db.profesionales.findAndCountAll({
            attributes: [
                "IdProfesional",
                "Nombre",
                "Apellido",
                "Activo",
            ],
            order: [["Nombre", "ASC"]],
            where,
            offset: (pagina - 1) * tamañoPagina,
            limit: tamañoPagina,
        });
        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (error) {
        console.error("Error en GET /api/profesionales:", error);
        return res.status(500).json({ error: "Error al obtener profesionales" });
    }
});

router.get("/api/profesionales/:id", async (req, res) => {
    try {
        let profesional = await db.profesionales.findOne({
            attributes: [
                "IdProfesional",
                "Nombre",
                "Apellido",
                "Activo",
            ],
            where: { IdProfesional: req.params.id },
        });
        
        if (!profesional) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        
        res.json(profesional);
    } catch (error) {
        console.error("Error en GET /api/profesionales/:id:", error);
        return res.status(500).json({ error: "Error al obtener el profesional" });
    }
});

router.post("/api/profesionales", async (req, res) => {
    try {
        let data = await db.profesionales.create({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Activo: req.body.Activo,
        });
        res.status(200).json(data.dataValues);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        console.error("Error en POST /api/profesionales:", error);
        return res.status(500).json({ error: error.message });
    }
});

router.put("/api/profesionales/:id", async (req, res) => {
    try {
        // Primero verificamos si el profesional existe
        const profesional = await db.profesionales.findByPk(req.params.id);
        if (!profesional) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        
        let data = await db.profesionales.update({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Activo: req.body.Activo
        }, {
            where: { IdProfesional: req.params.id },
            returning: true, // Para PostgreSQL, devuelve los registros actualizados
        });
        
        // data[0] contiene el número de filas afectadas, data[1] contiene los registros actualizados
        res.status(200).json(data[1][0]); // devolvemos el registro modificado
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        console.error("Error en PUT /api/profesionales/:id:", error);
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/api/profesionales/:id", async (req, res) => {
    let bajaFisica = false;

    try {
        // Verificar si el profesional existe
        const profesional = await db.profesionales.findByPk(req.params.id);
        if (!profesional) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        
        if (bajaFisica === false) {
            // Para PostgreSQL, usamos una sintaxis diferente para el toggle
            await db.profesionales.update(
                { Activo: db.sequelize.literal('NOT "Activo"') }, // Comillas para el nombre de columna en PostgreSQL
                { where: { IdProfesional: req.params.id } }
            );
            res.status(200).json({ message: "Estado de actividad cambiado correctamente" });
        } else {
            // Si se desea baja física en el futuro
            await db.profesionales.destroy({ where: { IdProfesional: req.params.id } });
            res.status(200).json({ message: "Profesional eliminado correctamente" });
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            const messages = err.errors.map((x) => x.message);
            res.status(400).json({ errors: messages });
        } else {
            console.error("Error en DELETE /api/profesionales/:id:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------

router.get(
    "/api/profesionalesJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
        try {
            const { rol } = res.locals.user;
            if (rol !== "admin") {
                return res.status(403).json({ message: "usuario no autorizado!" });
            }

            let items = await db.profesionales.findAll({
                attributes: [
                    "IdProfesional", // Corregido de IdPaciente a IdProfesional
                    "Nombre",
                    "Apellido",
                    "Activo",
                ],
                order: [["Nombre", "ASC"]],
            });
            res.json(items);
        } catch (error) {
            console.error("Error en GET /api/profesionalesJWT:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
);

module.exports = router;