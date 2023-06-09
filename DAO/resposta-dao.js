const RespostaModel = require("../model/Resposta.js")

module.exports = {
    listarTudo: async function() {
        const respostas = await RespostaModel.findAll()
        return respostas
    },

    listar: async function(limite, pagina) {
        const respostas = await RespostaModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return respostas
    },
    
    inserir: async function(resposta) {
        const novaResposta = await RespostaModel.create({
            resposta: resposta
        })
        
        return novaResposta
    },

    atualizar: async function(id, resposta) {
        return await RespostaModel.update(
            {
                resposta: resposta
            }, {
                where: { id: id }
            }
        )
    },

    excluir: async function(id) {
        return await RespostaModel.destroy({where: { id: id }})
    },

    getById: async function(id) {
        return await RespostaModel.findByPk(id)
    },
}