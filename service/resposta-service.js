const respostaDAO = require("../DAO/resposta-dao")
const usuarioService = require("../service/usuario-service")

module.exports = {
    existeResposta: async function(id) {
        return await respostaDAO.getById(id) != null
    },

    existeId: async function(id) {
        return await respostaDAO.getById(id) != null
    },

    listarRespostas: async function(limite, pagina) {
        const respostas = await respostaDAO.listar(limite, pagina)
        if (respostas) {
            if(respostas.rows.length > 0)
                return {status: 200, data: respostas}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    buscarId: async function(id) {
        const resposta = await respostaDAO.getById(id)
        if (resposta) {
            return {status: 200, data: resposta}
        }
        return {status: 404, data: "Não existe uma resposta com esse id"}
    },

    cadastrarResposta: async function(cpfLogado, resposta) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            const novaResposta = await respostaDAO.inserir(resposta)
            if (novaResposta) {
                return {status: 201, data: novaResposta}
            }
            return {status: 500, data: "Desculpe, não foi possível cadastrar essa resposta"}
        }
        return {status: 403, data: "Você não possui permissão para cadastrar respostas, apenas administradores"}
    },

    atualizarResposta: async function(cpfLogado, id, resposta) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                const [response] = await respostaDAO.atualizar(id, resposta)
                if (response) {
                    return {status: 201, data: response}
                }
                return {status: 500, data: "Desculpe, não foi possível atualizar essa resposta"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para alterar respostas, apenas administradores"}
    },

    excluirResposta: async function(cpfLogado, id) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                const resposta = await respostaDAO.excluir(id)
                if(resposta) {
                    return {status: 200, data: resposta}
                }
                return {status: 500, data: "Desculpe, não foi possível excluir essa resposta"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para deletar respostas, apenas administradores"}
    }
}