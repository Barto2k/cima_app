const express = require("express");
const cors = require("cors");

// crear servidor
const app = express();
app.use(express.json());  // para que pueda interpretar el body de las peticiones POST
app.use(cors());  // para que cualquier origen pueda acceder a los recursos

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial CIMA Software!");
});

// Inicialización de la base de datos con Sequelize
const { CrearBaseSiNoExiste } = require("./base-orm/pg-init");

// Inicializar la base de datos
CrearBaseSiNoExiste().then(() => {
  console.log("Base de datos inicializada");
}).catch(error => {
  console.error("Error al inicializar la base de datos:", error);
});

// Rutas
const pacientesRouter = require("./routes/pacientes");
app.use(pacientesRouter);

const profesionalesRouter = require("./routes/profesionales");
app.use(profesionalesRouter);

const seguridadRouter = require("./seguridad/seguridad");
app.use(seguridadRouter);

if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}

module.exports = app; // para testing