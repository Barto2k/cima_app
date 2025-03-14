const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    await db.open("./.data/CIMA.db");

    let existe = false;
    let res = null;
    // Tabla Usuarios
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
      );
      console.log("tabla usuarios creada!");
      await db.run(
        "insert into usuarios values (1,'admin','123','admin'),(2,'marco','45488175','member');"
      );
    }

    // Tabla Pacientes
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'pacientes'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table pacientes( IdPaciente INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT, Apellido TEXT, FechaNacimiento TEXT NOT NULL, DNI INTEGER NOT NULL, disponible BOOLEAN NOT NULL);"
      );
      console.log("tabla pacientes creada!");
      await db.run(
        `INSERT INTO pacientes (IdPaciente, Nombre, Apellido, FechaNacimiento, DNI, disponible)
        VALUES 
          (1, 'Marco', 'Figueroa', '1944-01-01', 45488175, 1),
          (2, 'Juan', 'Bordino', '1946-01-01', 43488175, 1),
          (3, 'Pedro', 'Yorlano', '1947-01-01', 44488175, 1),
          (4, 'Alena', 'Ariza', '1948-01-01', 46488175, 0);`
      );
    }

    // Tabla Profesionales
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'profesionales'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `CREATE TABLE profesionales (
          IdProfesional INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT, 
          Apellido TEXT, 
          Activo BOOLEAN
        );`
      );
      console.log("tabla profesionales creada!");
      await db.run(
        `INSERT INTO profesionales (IdProfesional, Nombre, Apellido, Activo)
        VALUES 
          (1, 'Sofia', 'Figueroa', 1),
          (2, 'Agustina', 'Figueroa', 1),
          (3, 'Lola', 'Lopez', 0);`
      );
    }

    // cerrar la base
    db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;