const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const PerguntaModel = require("../model/Pergunta")
const RespostaModel = require("../model/Resposta")

const RelacaoQnAModel = sequelize.define('RelacaoQnA', 
    {
        id_pergunta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_resposta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        resposta_certa: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

//RelacaoQnAModel consegue ter acesso aos PerguntaModel, mas PerguntaModel nao tem acesso aos RelacaoQnAModel
RelacaoQnAModel.belongsTo(PerguntaModel, {
    foreignKey: 'id_pergunta'
})

//PerguntaModel consegue ter acesso aos RelacaoQnAModel, mas RelacaoQnAModel nao tem acesso aos PerguntaModel
PerguntaModel.hasMany(RelacaoQnAModel, {foreignKey: 'id_pergunta'})

//RelacaoQnAModel consegue ter acesso aos RespostaModel, mas RespostaModel nao tem acesso aos RelacaoQnAModel
RelacaoQnAModel.belongsTo(RespostaModel, {
    foreignKey: 'id_resposta'
})

//RespostaModel consegue ter acesso aos RelacaoQnAModel, mas RelacaoQnAModel nao tem acesso aos RespostaModel
RespostaModel.hasMany(RelacaoQnAModel, {foreignKey: 'id_resposta'})

module.exports = RelacaoQnAModel