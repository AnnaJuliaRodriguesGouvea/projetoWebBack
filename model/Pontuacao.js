const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const UsuarioModel = require("../model/Usuario")

const PontuacaoModel = sequelize.define('Pontuacao', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        pontuacao: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)

PontuacaoModel.belongsTo(UsuarioModel, {
    foreignKey: 'cpf'
})

UsuarioModel.hasMany(PontuacaoModel, {foreignKey: 'cpf'})

module.exports = PontuacaoModel