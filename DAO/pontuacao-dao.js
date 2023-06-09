const PontuacaoModel = require("../model/Pontuacao.js")

module.exports = {
    listar: async function(limite, pagina) {
        const pontuacoes = await PontuacaoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return pontuacoes
    },
    
    inserir: async function(pontuacao, cpf) {
        const novaPontuacao = await PontuacaoModel.create({
            pontuacao: pontuacao,
            cpf: cpf
        })
        
        return novaPontuacao
    },

    atualizar: async function(id, pontuacao, cpf) {
        return await PontuacaoModel.update(
            {
                pontuacao: pontuacao,
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
}