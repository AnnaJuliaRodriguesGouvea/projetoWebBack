const perguntaDAO = require("../DAO/pergunta-dao")
const usuarioService = require("../service/usuario-service")
const temaService = require("../service/tema-service")

module.exports = {
    existePergunta: async function(id) {
        return await perguntaDAO.getById(id) != null
    },

    existeId: async function(id) {
        return await perguntaDAO.getById(id) != null
    },

    listarPerguntas: async function(limite, pagina) {
        const perguntas = await perguntaDAO.listar(limite, pagina)
        if (perguntas) {
            if(perguntas.rows.length > 0)
                return {status: 200, data: perguntas}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    buscarId: async function(id) {
        const pergunta = await perguntaDAO.getById(id)
        if (pergunta) {
            return {status: 200, data: pergunta}
        }
        return {status: 404, data: "Não existe uma pergunta com esse id"}
    },

    cadastrarPergunta: async function(cpfLogado, questao, nivel, id_tema) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if(await temaService.existeIdTema(id_tema)) {
                const pergunta = await perguntaDAO.inserir(questao, nivel, id_tema)
                if (pergunta) {
                    return {status: 201, data: pergunta}
                }
                return {status: 500, data: "Desculpe, não foi possível cadastrar essa pergunta"}
            }
            return {status: 404, data: "Desculpe, o tema passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para cadastrar perguntas, apenas administradores"}
    },

    atualizarPergunta: async function(cpfLogado, id, questao, nivel, id_tema) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                if(await temaService.existeIdTema(id_tema)) {
                    const [response] = await perguntaDAO.atualizar(id, questao, nivel, id_tema)
                    if (response) {
                        return {status: 201, data: response}
                    }
                    return {status: 500, data: "Desculpe, não foi possível atualizar essa pergunta"}
                }
                return {status: 404, data: "Desculpe, o tema passado não existe"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para alterar perguntas, apenas administradores"}
    },

    excluirPergunta: async function(cpfLogado, id) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                const pergunta = await perguntaDAO.excluir(id)
                if(pergunta) {
                    return {status: 200, data: pergunta}
                }
                return {status: 500, data: "Desculpe, não foi possível excluir essa pergunta"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para deletar perguntas, apenas administradores"}
    }
}