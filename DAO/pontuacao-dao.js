const { Op } = require("sequelize")
const PontuacaoModel = require("../model/Pontuacao.js")

module.exports = {
    listar: async function(limite, pagina) {
        const pontuacoes = await PontuacaoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return pontuacoes
    },
    
    inserir: async function(pontuacao, perguntasRespondidas, nivel, cpf) {
        const novaPontuacao = await PontuacaoModel.create({
            pontuacao: pontuacao,
            perguntasRespondidas: perguntasRespondidas,
            nivel: nivel,
            cpf: cpf
        })
        
        return novaPontuacao
    },

    atualizar: async function(id, pontuacao, perguntasRespondidas, nivel, cpf) {
        return await PontuacaoModel.update(
            {
                pontuacao: pontuacao,
                perguntasRespondidas: perguntasRespondidas,
                nivel: nivel,
                cpf: cpf
            }, {
                where: { id: id }
            }
        )
    },

    excluir: async function(id) {
        return await PontuacaoModel.destroy({where: { id: id }})
    },

    getById: async function(id) {
        return await PontuacaoModel.findByPk(id)
    },

    getByCpf: async function(limite, pagina, cpf) {
        return await PontuacaoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite,
            where: {cpf: cpf}
        })
    },

    existeJogoEmAndamento: async function(cpf) {
        return await PontuacaoModel.findOne({ 
            where: {
                [Op.and]: [
                    { cpf: cpf },
                    { perguntasRespondidas: { [Op.lt]: 3 } }
                ]
            }
        })
    },

    getUltimaPontuacao: async function(cpf) {
        return await PontuacaoModel.findOne({
            where: {
                cpf: cpf
            },
            order: [['id', 'DESC']]
        })
    }
}