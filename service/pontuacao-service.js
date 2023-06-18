const pontuacaoDAO = require("../DAO/pontuacao-dao")
const usuarioService = require("../service/usuario-service")
const temaService = require("../service/tema-service")

module.exports = {
    existeId: async function(id) {
        return await pontuacaoDAO.getById(id) != null
    },

    listarPontuacao: async function(limite, pagina) {
        const pontuacoes = await pontuacaoDAO.listar(limite, pagina)
        if (pontuacoes) {
            if(pontuacoes.rows.length > 0)
                return {status: 200, data: pontuacoes}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    buscarId: async function(id) {
        const pontuacao = await pontuacaoDAO.getById(id)
        if (pontuacao) {
            return {status: 200, data: pontuacao}
        }
        return {status: 404, data: "Não existe uma pontuação com esse id"}
    },

    buscarPorCpf: async function(limite, pagina, cpf) {
        const pontuacoes = await pontuacaoDAO.getByCpf(limite, pagina, cpf)
        if (pontuacoes) {
            if(pontuacoes.rows.length > 0)
                return {status: 200, data: pontuacoes}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 404, data: "Não existe pontuações com esse cpf"}
    },

    cadastrarPontuacao: async function(cpfLogado, pontuacao, perguntasRespondidas, nivel, cpf) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if(await usuarioService.existeCPF(cpf)) {
                const novaPontuacao = await pontuacaoDAO.inserir(pontuacao, perguntasRespondidas, nivel, cpf)
                if (novaPontuacao) {
                    return {status: 201, data: novaPontuacao}
                }
                return {status: 500, data: "Desculpe, não foi possível cadastrar a pontuação"}
            }
            return {status: 404, data: "Desculpe, o cpf passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para cadastrar pontuações, apenas administradores"}
    },

    atualizarPontuacao: async function(cpfLogado, id, pontuacao, perguntasRespondidas, nivel, cpf) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                if(await usuarioService.existeCPF(cpf)) {
                    const [response] = await pontuacaoDAO.atualizar(id, pontuacao, perguntasRespondidas, nivel, cpf)
                    if (response) {
                        return {status: 201, data: response}
                    }
                    return {status: 500, data: "Desculpe, não foi possível atualizar essa pontuação"}
                }
                return {status: 404, data: "Desculpe, o cpf passado não existe"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para alterar pontuações, apenas administradores"}
    },

    excluirPontuacao: async function(cpfLogado, id) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id)) {
                const pontuacao = await pontuacaoDAO.excluir(id)
                if(pontuacao) {
                    return {status: 200, data: pontuacao}
                }
                return {status: 500, data: "Desculpe, não foi possível excluir essa pontuação"}
            }
            return {status: 404, data: "Desculpe, o id passado não existe"}
        }
        return {status: 403, data: "Você não possui permissão para deletar pontuações, apenas administradores"}
    }
}