const relacaoQnADAO = require("../DAO/relacao-qna-dao")
const usuarioService = require("../service/usuario-service")
const perguntaService = require("../service/pergunta-service")
const respostaService = require("../service/resposta-service")

module.exports = {
    existeId: async function(id_pergunta, id_resposta) {
        return await relacaoQnADAO.getById(id_pergunta, id_resposta) != null
    },

    existeRespostaCorreta: async function(id_pergunta) {
        return await relacaoQnADAO.getByRespostaCerta(id_pergunta) != null
    },

    listarRelacoes: async function(limite, pagina) {
        const relacoes = await relacaoQnADAO.listar(limite, pagina)
        if (relacoes) {
            if(relacoes.rows.length > 0)
                return {status: 200, data: relacoes}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    buscarId: async function(id_pergunta, id_resposta) {
        const relacao = await relacaoQnADAO.getById(id_pergunta, id_resposta)
        if (relacao) {
            return {status: 200, data: relacao}
        }
        return {status: 404, data: "Não existe uma relação entre essa pergunta e essa resposta"}
    },

    cadastrarRelacao: async function(cpfLogado, id_pergunta, id_resposta, resposta_certa) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if(await perguntaService.existePergunta(id_pergunta) && await respostaService.existeResposta(id_resposta)) {
                if(!await this.existeId(id_pergunta, id_resposta)) {
                    if(resposta_certa === false || !await this.existeRespostaCorreta(id_pergunta)) {
                        const relacao = await relacaoQnADAO.inserir(id_pergunta, id_resposta, resposta_certa)
                        if (relacao) {
                            return {status: 201, data: relacao}
                        }
                        return {status: 500, data: "Desculpe, não foi possível cadastrar esse relacionamento"}
                    }
                    return {status: 404, data: "Já existe uma resposta correta para essa pergunta"}
                }
                return {status: 404, data: "Esse relacionamento já existe"}
            } 
            return {status: 404, data: "Desculpe, a pergunta ou resposta informada não existe"}
        }
        return {status: 403, data: "Você não possui permissão para cadastrar relacionamentos, apenas administradores"}
    },

    atualizarRelacao: async function(cpfLogado, id_pergunta, id_resposta, resposta_certa) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await perguntaService.existePergunta(id_pergunta) && await respostaService.existeResposta(id_resposta)) {
                if(await this.existeRespostaCorreta(id_pergunta) && resposta_certa === true) {
                    return {status: 404, data: "Desculpe, essa pergunta já possui uma resposta correta, altere essa resposta para false antes"}
                }
                if(await this.existeId(id_pergunta, id_resposta)) {
                    const [response] = await relacaoQnADAO.atualizar(id_pergunta, id_resposta, resposta_certa)
                    if (response) {
                        return {status: 201, data: response}
                    }
                    return {status: 500, data: "Desculpe, não foi possível atualizar esse relacionamento"}
                }
                return {status: 404, data: "Desculpe, esse relacionamento não existe"}
            }
            return {status: 404, data: "Desculpe, a pergunta ou resposta informada não existe"}
        }
        return {status: 403, data: "Você não possui permissão para alterar relacionamentos, apenas administradores"}
    },

    excluirRelacao: async function(cpfLogado, id_pergunta, id_resposta) {
        if(await usuarioService.isAdmin(cpfLogado)) {
            if (await this.existeId(id_pergunta, id_resposta)) {
                const relacao = await relacaoQnADAO.excluir(id_pergunta, id_resposta)
                if(relacao) {
                    return {status: 200, data: relacao}
                }
                return {status: 500, data: "Desculpe, não foi possível excluir esse relacionamento"}
            }
            return {status: 404, data: "Desculpe, esse relacionamento não existe"}
        }
        return {status: 403, data: "Você não possui permissão para deletar relacionamentos, apenas administradores"}
    }
}