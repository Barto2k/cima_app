const express = require('express');
const router = express.Router();
const db = require('../base-orm/pg-init'); // Cambiado a pg-init
const { Op, ValidationError } = require("sequelize");
const auth = require('../seguridad/auth');
require('dotenv').config();

router.get("/api/pacientes", async (req, res) => {
    let where = {};
    if (req.query.nombre != undefined && req.query.nombre !== "") {
        where.Nombre = { // Nota: cambiado a Nombre con mayúscula para coincidir con el modelo
            [Op.iLike]: "%" + req.query.nombre + "%", // iLike para PostgreSQL (case-insensitive)
        };
    }
    if (req.query.disponible != undefined && req.query.disponible !== "") {
        where.disponible = req.query.disponible === "true";
    }
    const pagina = req.query.pagina ?? 1;
    const tamañoPagina = 6;

    try {
        const { count, rows } = await db.pacientes.findAndCountAll({
            attributes: [
                "IdPaciente",
                "Nombre",
                "Apellido",
                "FechaNacimiento",
                "DNI",
                "disponible",
            ],
            order: [["Nombre", "ASC"]],
            where,
            offset: (pagina - 1) * tamañoPagina,
            limit: tamañoPagina,
        });
        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (error) {
        console.error("Error en GET /api/pacientes:", error);
        return res.status(500).json({ error: "Error al obtener pacientes" });
    }
});

router.get("/api/pacientes/:id", async (req, res) => {
    try {
        let paciente = await db.pacientes.findOne({
            attributes: [
                "IdPaciente",
                "Nombre",
                "Apellido",
                "FechaNacimiento",
                "DNI",
                "disponible",
            ],
            where: { IdPaciente: req.params.id },
        });
        
        if (!paciente) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        
        res.json(paciente);
    } catch (error) {
        console.error("Error en GET /api/pacientes/:id:", error);
        return res.status(500).json({ error: "Error al obtener el paciente" });
    }
});

router.post("/api/pacientes", async (req, res) => {
    try {
        let data = await db.pacientes.create({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            FechaNacimiento: req.body.FechaNacimiento,
            DNI: req.body.DNI,
            disponible: req.body.disponible,
        });
        res.status(200).json(data.dataValues);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        console.error("Error en POST /api/pacientes:", error);
        return res.status(500).json({ error: error.message });
    }
});

router.put("/api/pacientes/:id", async (req, res) => {
    try {
        // Primero verificamos si el paciente existe
        const paciente = await db.pacientes.findByPk(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        
        let data = await db.pacientes.update({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            FechaNacimiento: req.body.FechaNacimiento,
            DNI: req.body.DNI,
            disponible: req.body.disponible,
        }, {
            where: { IdPaciente: req.params.id },
            returning: true, // Para PostgreSQL, devuelve los registros actualizados
        });
        
        // data[0] contiene el número de filas afectadas, data[1] contiene los registros actualizados
        res.status(200).json(data[1][0]); // devolvemos el registro modificado
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        console.error("Error en PUT /api/pacientes/:id:", error);
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/api/pacientes/:id", async (req, res) => {
    let bajaFisica = false;

    try {
        // Verificar si el paciente existe
        const paciente = await db.pacientes.findByPk(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        
        if (bajaFisica === false) {
            // Para PostgreSQL, usamos una sintaxis diferente para el toggle
            await db.pacientes.update(
                { disponible: db.sequelize.literal('NOT disponible') },
                { where: { IdPaciente: req.params.id } }
            );
            res.status(200).json({ message: "Estado de disponibilidad cambiado correctamente" });
        } else {
            // Si se desea baja física en el futuro
            await db.pacientes.destroy({ where: { IdPaciente: req.params.id } });
            res.status(200).json({ message: "Paciente eliminado correctamente" });
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            const messages = err.errors.map((x) => x.message);
            res.status(400).json(messages);
        } else {
            console.error("Error en DELETE /api/pacientes/:id:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------

router.get(
    "/api/pacientesJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
        try {
            const { rol } = res.locals.user;
            if (rol !== "admin") {
                return res.status(403).json({ message: "usuario no autorizado!" });
            }

            let items = await db.pacientes.findAll({
                attributes: [
                    "IdPaciente",
                    "Nombre",
                    "Apellido",
                    "FechaNacimiento",
                    "DNI",
                    "disponible",
                ],
                order: [["Nombre", "ASC"]],
            });
            res.json(items);
        } catch (error) {
            console.error("Error en GET /api/pacientesJWT:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
);

module.exports = router;