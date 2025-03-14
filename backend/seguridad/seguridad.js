const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Para encriptar contraseñas
const auth = require("./auth");

const users = [
  {
    usuario: "admin",
    clave: bcrypt.hashSync("123", 10), // Encriptar la contraseña inicial
    rol: "admin",
  },
  {
    usuario: "marco",
    clave: bcrypt.hashSync("45488175", 10), // Encriptar la contraseña inicial
    rol: "member",
  },
  // Agreguense aca
];
let refreshTokens = [];

// Middleware para verificar el token de autenticación
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, auth.accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.user = user; // Adjuntar el usuario decodificado a la solicitud
    next();
  });
};

// Endpoint para actualizar la contraseña
router.put("/api/update-password", authMiddleware, (req, res) => {
  const { usuario, nuevaClave } = req.body;

  // Validar que la nueva contraseña cumpla con los requisitos
  if (!nuevaClave || nuevaClave.length < 8) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
  }

  // Buscar el usuario en el array de usuarios
  const userIndex = users.findIndex((u) => u.usuario === usuario);

  if (userIndex !== -1) {
    // Encriptar la nueva contraseña antes de guardarla
    bcrypt.hash(nuevaClave, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Error al encriptar la contraseña" });
      }

      // Actualizar la contraseña encriptada
      users[userIndex].clave = hashedPassword;
      res.json({ message: "Contraseña actualizada correctamente" });
    });
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

// Endpoint para login
router.post("/api/login", (req, res) => {
  const { usuario, clave } = req.body;

  const user = users.find((u) => u.usuario === usuario);

  if (user) {
    // Comparar la contraseña encriptada
    bcrypt.compare(clave, user.clave, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }

      // Generar tokens
      const accessToken = jwt.sign(
        { usuario: user.usuario, rol: user.rol },
        auth.accessTokenSecret,
        { expiresIn: "20m" }
      );

      const refreshToken = jwt.sign(
        { usuario: user.usuario, rol: user.rol },
        auth.refreshTokenSecret
      );

      refreshTokens.push(refreshToken);

      res.json({
        accessToken,
        refreshToken,
        message: "Bienvenido " + user.usuario + "!",
      });
    });
  } else {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
});

// Endpoint para logout
router.post("/api/logout", (req, res) => {
  const { token } = req.body;
  let message = "Logout inválido!";
  if (refreshTokens.includes(token)) {
    message = "Usuario deslogueado correctamente!";
  }

  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message });
});

// Endpoint para refrescar el token
router.post("/api/token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Token de refresco inválido" });
  }

  jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token de refresco inválido o expirado" });
    }

    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});

module.exports = router;