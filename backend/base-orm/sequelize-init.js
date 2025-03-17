const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config(); // Cargar variables de entorno desde .env

// Configuración de Sequelize usando DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Habilita SSL
      rejectUnauthorized: false, // Desactiva la verificación del certificado (útil para entornos de producción)
    },
  },
  logging: false, // Desactiva los logs de Sequelize (opcional)
});

// Definición del modelo de datos
const usuarios = sequelize.define(
  "usuarios",
  {
    IdUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 15],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 15 de longitud",
        },
      },
    },
    Clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Rol: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Rol es requerido",
        },
        len: {
          args: [0, 8],
          msg: "Rol debe ser tipo caracteres, entre 0 y 8 de longitud",
        },
      },
    },
  },
  {
    // Desactivar timestamps automáticos
    timestamps: false,
  }
);

const pacientes = sequelize.define(
  "pacientes",
  {
    IdPaciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 60],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 60 de longitud",
        },
      },
    },
    Apellido: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Apellido es requerido",
        },
        len: {
          args: [2, 60],
          msg: "Apellido debe ser tipo caracteres, entre 2 y 60 de longitud",
        },
      },
    },
    FechaNacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Fecha de nacimiento es requerido",
        },
        isDate: {
          args: true,
          msg: "Fecha de nacimiento debe ser tipo fecha",
        },
      },
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "DNI es requerido",
        },
        isNumeric: {
          args: true,
          msg: "DNI debe ser tipo numérico",
        },
      },
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Disponible es requerido",
        },
        isBoolean: {
          args: true,
          msg: "Disponible debe ser tipo booleano",
        },
      },
    },
  },
  {
    // Desactivar timestamps automáticos
    timestamps: false,
  }
);

const profesionales = sequelize.define(
  "profesionales",
  {
    IdProfesional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 60],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 60 de longitud",
        },
      },
    },
    Apellido: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Apellido es requerido",
        },
        len: {
          args: [2, 60],
          msg: "Apellido debe ser tipo caracteres, entre 2 y 60 de longitud",
        },
      },
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Activo es requerido",
        },
        isBoolean: {
          args: true,
          msg: "Activo debe ser tipo booleano",
        },
      },
    },
  },
  {
    // Desactivar timestamps automáticos
    timestamps: false,
  }
);

// Función para sincronizar los modelos con la base de datos
async function inicializarBD() {
  try {
    // Sincronizar todos los modelos con la base de datos
    await sequelize.sync({ force: true });

    // Verificar si hay datos, si no, insertar datos iniciales
    const cantidadUsuarios = await usuarios.count();
    if (cantidadUsuarios === 0) {
      await usuarios.bulkCreate([
        { IdUsuario: 1, Nombre: 'admin', Clave: '123', Rol: 'admin' },
        { IdUsuario: 2, Nombre: 'marco', Clave: '45488175', Rol: 'member' }
      ]);
      console.log("Datos iniciales de usuarios creados!");
    }

    const cantidadPacientes = await pacientes.count();
    if (cantidadPacientes === 0) {
      await pacientes.bulkCreate([
        { IdPaciente: 1, Nombre: 'Marco', Apellido: 'Figueroa', FechaNacimiento: '1944-01-01', DNI: 45488175, disponible: true },
        { IdPaciente: 2, Nombre: 'Juan', Apellido: 'Bordino', FechaNacimiento: '1946-01-01', DNI: 43488175, disponible: true },
        { IdPaciente: 3, Nombre: 'Pedro', Apellido: 'Yorlano', FechaNacimiento: '1947-01-01', DNI: 44488175, disponible: true },
        { IdPaciente: 4, Nombre: 'Alena', Apellido: 'Ariza', FechaNacimiento: '1948-01-01', DNI: 46488175, disponible: false }
      ]);
      console.log("Datos iniciales de pacientes creados!");
    }

    const cantidadProfesionales = await profesionales.count();
    if (cantidadProfesionales === 0) {
      await profesionales.bulkCreate([
        { IdProfesional: 1, Nombre: 'Sofia', Apellido: 'Figueroa', Activo: true },
        { IdProfesional: 2, Nombre: 'Agustina', Apellido: 'Figueroa', Activo: true },
        { IdProfesional: 3, Nombre: 'Lola', Apellido: 'Lopez', Activo: false }
      ]);
      console.log("Datos iniciales de profesionales creados!");
    }

    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

module.exports = {
  sequelize,
  pacientes,
  profesionales,
  usuarios,
  inicializarBD
};