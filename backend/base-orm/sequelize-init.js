const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/CIMA.db");

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
    Rol: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Descripcion es requerido",
        },
        len: {
          args: [0, 8],
          msg: "Descripcion debe ser tipo caracteres, entre 0 y 8 de longitud",
        },
      },
    },
  },
  {
    // desactivar timestamps automáticos
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
          msg: "DNI debe ser tipo numerico",
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
          msg: "Disponible debe ser tipo boolean",
        },
      },
    },
  },
  {
    // desactivar timestamps automáticos
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
          msg: "Activo debe ser tipo boolean",
        },
      },
    },
  },
  {
    // desactivar timestamps automáticos
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  pacientes,
  profesionales,
  usuarios,
};