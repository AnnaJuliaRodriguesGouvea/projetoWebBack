const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const RespostaModel = sequelize.define('Resposta', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        resposta: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

module.exports = RespostaModel