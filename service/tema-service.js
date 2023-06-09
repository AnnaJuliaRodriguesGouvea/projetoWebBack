const temaDAO = require("../DAO/tema-dao")
const usuarioService = require("../service/usuario-service")

module.exports = {
    existeIdTema: async function(id) {
        return await temaDAO.getById(id) != null
    },

    existeTema: async function(tema) {
        return await temaDAO.getByTema(tema) != null
    },

    existeId: async function(id) {
        return await temaDAO.getById(id) != null
    },

    listarTema: async function(limite, pagina) {
        const temas = await temaDAO.listar(limite, pagina)
        if (temas) {
            if(temas.rows.length > 0)
                return {status: 200, data: temas}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    buscarId: async function(id) {
        const tema = await temaDAO.getById(id)
        if (tema) {
            return {status: 200, data: tema}
        }
        return {status: 404, data: "Não existe um tema com esse id"}
    },

    cadastrarTema: async function(cpfLogado, tema) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if(await this.existeTema(tema)) {
                return {status: 404, data: "O tema já existe"}
            }
            const novoTema = await temaDAO.inserir(tema)
            if (novoTema) {
                return {status: 201, data: novoTema}
            }
            return {status: 500, data: "Desculpe, não foi possível cadastrar esse tema"}
            
        }
        return {status: 403, data: "Você não possui permissão para cadastrar temas, apenas administradores"}
    },

    atualizarTema: async function(cpfLogado, id, tema) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                const [response] = await temaDAO.atualizar(id, tema)
                if (response) {
                    return {status: 201, data: response}
                }
                return {status: 500, data: "Desculpe, não foi possível atualizar esse tema"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para alterar temas, apenas administradores"}
    },

    excluirTema: async function(cpfLogado, id) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                const resposta = await temaDAO.excluir(id)
                if(resposta) {
                    return {status: 200, data: resposta}
                }
                return {status: 500, data: "Desculpe, não foi possível excluir esse tema"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para deletar temas, apenas administradores"}
    }
}