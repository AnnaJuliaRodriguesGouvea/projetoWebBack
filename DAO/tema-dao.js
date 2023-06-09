const TemaModel = require("../model/Tema.js")

module.exports = {
    listar: async function(limite, pagina) {
        const temas = await TemaModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return temas
    },
    
    inserir: async function(tema) {
        const novoTema = await TemaModel.create({
            tema: tema.toLowerCase()
        })
        
        return novoTema
    },

    atualizar: async function(id, tema) {
        return await TemaModel.update(
            {
                tema: tema.toLowerCase()
            }, {
                where: { id: id }
            }
        )
    },

    excluir: async function(id) {
        return await TemaModel.destroy({where: { id: id }})
    },

    getById: async function(id) {
        return await TemaModel.findByPk(id)
    },

    getByTema: async function(tema) {
        return await TemaModel.findOne({ where: { tema: tema.toLowerCase() } })
    }
}