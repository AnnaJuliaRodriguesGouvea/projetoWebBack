const { Op } = require("sequelize")
const RelacaoQnAModel = require("../model/RelacaoQnA")
const PerguntaModel = require("../model/Pergunta.js")
const RespostaModel = require("../model/Resposta.js")

module.exports = {
    listar: async function(limite, pagina) {
        const relacoes = await RelacaoQnAModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return relacoes
    },
    
    inserir: async function(id_pergunta, id_resposta, resposta_certa) {
        const relacao = await RelacaoQnAModel.create({
            id_pergunta: id_pergunta,
            id_resposta: id_resposta,
            resposta_certa: resposta_certa
        })
        
        return relacao
    },

    atualizar: async function(id_pergunta, id_resposta, resposta_certa) {
        return await RelacaoQnAModel.update(
            {
                resposta_certa: resposta_certa
            }, {
                where: {
                    [Op.and]: [
                      { id_pergunta: id_pergunta },
                      { id_resposta: id_resposta }
                    ]
                }
            }
        )
    },

    excluir: async function(id_pergunta, id_resposta) {
        return await RelacaoQnAModel.destroy({
            where: {
                [Op.and]: [
                    { id_pergunta: id_pergunta },
                    { id_resposta: id_resposta }
                ]
            }
        })
    },

    getById: async function(id_pergunta, id_resposta) {
        return await RelacaoQnAModel.findOne({
            where: {
                id_pergunta: id_pergunta,
                id_resposta: id_resposta
            }
        })
    },

    getByRespostaCerta: async function(id_pergunta) {
        return await RelacaoQnAModel.findOne({
            where: {
                id_pergunta: id_pergunta,
                resposta_certa: true
            }
        })
    },

    getRelacao: async function(perguntas) {
        return await RelacaoQnAModel.findAll({
            include: [{
                model: PerguntaModel,
                required: true,
                attributes: ["questao", "nivel", "id_tema"],
            }, {
                model: RespostaModel,
                attributes: ["resposta"],
                required: true
            }],
            attributes: ["id_pergunta", "id_resposta"],
            where: { id_pergunta: { [Op.in]: perguntas } }
        })
    }
}