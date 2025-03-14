const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require("sequelize");
const auth = require('../seguridad/auth');

router.get("/api/profesionales", async (req, res) => {
    let where = {};
    if (req.query.nombre != undefined && req.query.nombre !== "") {
        where.nombre = {
            [Op.like]: "%" + req.query.nombre + "%",
        };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
        // true o false en el modelo, en base de datos es 1 o 0
        // convertir el string a booleano
        where.Activo = req.query.Activo === "true";
    }
    const pagina = req.query.pagina ?? 1; //paginacion
    const tamañoPagina = 6;

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
});

router.get("/api/profesionales/:id", async (req, res) => {
    let profesional = await db.profesionales.findOne({
        attributes: [
            "IdProfesional",
            "Nombre",
            "Apellido",
            "Activo",
        ],
        where: { IdProfesional: req.params.id },
    });
    res.json(profesional);
});

router.post("/api/profesionales", async (req, res) => {
    try {
        let data = await db.profesionales.create({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Activo: req.body.Activo,
        });
        res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        return res.status(500).json(error.message);
    }
});

router.put("/api/profesionales/:id", async (req, res) => {
    try {
        let data = await db.profesionales.update({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Activo: req.body.Activo
        }, {
            where: { IdProfesional: req.params.id },
        });
        res.status(200).json(data); // devolvemos el registro modificado!
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        return res.status(500).json(error.message);
    }
});

router.delete("/api/profesionales/:id", async (req, res) => {
    let bajaFisica = false;

    if (bajaFisica === false) {
        // baja lógica
        try {
            let data = await db.sequelize.query(
                "UPDATE profesionales SET Activo = CASE WHEN Activo = 1 THEN 0 ELSE 1 END WHERE IdProfesional = :IdProfesional",
                {
                    replacements: { IdProfesional: +req.params.id },
                }
            );
            res.status(200).json({ message: "Profesional actualizado correctamente." });
        } catch (err) {
            if (err instanceof ValidationError) {
                // si son errores de validación, los devolvemos
                const messages = err.errors.map((x) => x.message);
                res.status(400).json({ errors: messages });
            } else {
                // si son errores desconocidos, los dejamos que los controle el middleware de errores
                console.error("Error en el endpoint DELETE:", err);
                res.status(500).json({ error: "Error interno del servidor." });
            }
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
        const { rol } = res.locals.user;
        if (rol !== "admin") {
            return res.status(403).json({ message: "usuario no autorizado!" });
        }

        let items = await db.profesionales.findAll({
            attributes: [
                "IdPaciente",
                "Nombre",
                "Apellido",
                "Activo",
            ],
            order: [["Nombre", "ASC"]],
        });
        res.json(items);
    }
);


module.exports = router;