const PerguntaModel = require("../model/Pergunta.js")

module.exports = {
    listar: async function(limite, pagina) {
        const perguntas = await PerguntaModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return perguntas
    },

    inserir: async function(questao, nivel, id_tema) {
        const pergunta = await PerguntaModel.create({
            questao: questao,
            nivel: nivel,
            id_tema: id_tema
        })
        
        return pergunta
    },

    atualizar: async function(id, questao, nivel, id_tema) {
        return await PerguntaModel.update(
            {
                questao: questao,
                nivel: nivel,
                id_tema: id_tema
            }, {
                where: { id: id }
            }
        )
    },

    excluir: async function(id) {
        return await PerguntaModel.destroy({where: { id: id }})
    },

    getById: async function(id) {
        return await PerguntaModel.findByPk(id)
    },
}