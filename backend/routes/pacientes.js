const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require("sequelize");
const auth = require('../seguridad/auth');

router.get("/api/pacientes", async (req, res) => {
    let where = {};
    if (req.query.nombre != undefined && req.query.nombre !== "") {
        where.nombre = {
            [Op.like]: "%" + req.query.nombre + "%",
        };
    }
    if (req.query.disponible != undefined && req.query.disponible !== "") {
        // true o false en el modelo, en base de datos es 1 o 0
        // convertir el string a booleano
        where.disponible = req.query.disponible === "true";
    }
    const pagina = req.query.pagina ?? 1; //paginacion
    const tamañoPagina = 6;

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
});

router.get("/api/pacientes/:id", async (req, res) => {
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
    res.json(paciente);
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
        res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        return res.status(500).json(error.message);
    }
});

router.put("/api/pacientes/:id", async (req, res) => {
    try {
        let data = await db.pacientes.update({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            FechaNacimiento: req.body.FechaNacimiento,
            DNI: req.body.DNI,
            disponible: req.body.disponible,
        }, {
            where: { IdPaciente: req.params.id },
        });
        res.status(200).json(data); // devolvemos el registro modificado!
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json(error.errors.map((e) => e.message));
        }
        return res.status(500).json(error.message);
    }
});

router.delete("/api/pacientes/:id", async (req, res) => {
    let bajaFisica = false;

    if (bajaFisica === false) {
        // baja lógica
        try {
            let data = await db.sequelize.query(
                "UPDATE pacientes SET Disponible = case when disponible = 1 then 0 else 1 end WHERE IdPaciente = :IdPaciente",
                {
                    replacements: { IdPaciente: +req.params.id },
                }
            );
            res.sendStatus(200);
        } catch (err) {
            if (err instanceof ValidationError) {
                // si son errores de validación, los devolvemos
                const messages = err.errors.map((x) => x.message);
                res.status(400).json(messages);
            } else {
                // si son errores desconocidos, los dejamos que los controle el middleware de errores
                throw err;
            }
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
    }
);


module.exports = router;