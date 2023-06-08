const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const TemaModel = require("../model/Tema")

const PerguntaModel = sequelize.define('Pergunta', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        questao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nivel: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)

PerguntaModel.belongsTo(TemaModel, {
    foreignKey: 'id_tema'
})

TemaModel.hasMany(PerguntaModel, {foreignKey: 'id_tema'})

module.exports = PerguntaModel