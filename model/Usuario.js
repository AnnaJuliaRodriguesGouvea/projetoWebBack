const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const UsuarioModel = sequelize.define('Usuario', 
    {
        cpf: {
            type: DataTypes.STRING(11),
            primaryKey: true,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

module.exports = UsuarioModel