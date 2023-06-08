const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const TemaModel = sequelize.define('Tema', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        tema: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

module.exports = TemaModel