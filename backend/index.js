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

if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

require("./base-orm/sqlite-init");  // crear base si no existe


const pacientesRouter = require("./routes/pacientes");
app.use(pacientesRouter);

const profesionalesRouter = require("./routes/profesionales");
app.use(profesionalesRouter);

const seguridadRouter = require("./seguridad/seguridad");
app.use(seguridadRouter);

module.exports = app; // para testing