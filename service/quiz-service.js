const pontuacaoDAO = require("../DAO/pontuacao-dao")
const relacaoQnADAO = require("../DAO/relacao-qna-dao")
const perguntaDAO = require("../DAO/pergunta-dao")
const relacaoQnAService = require("../service/relacao-qna-service")

module.exports = {
    existeJogoEmAndamento: async function(cpfLogado) {
        return await pontuacaoDAO.existeJogoEmAndamento(cpfLogado) != null
    },

    capturaRandomIds: async function(ids) {
        var response = []
        while(response.length < 3) {
            var id = ids[Math.floor(Math.random()*ids.length)]
            ids.splice(ids.indexOf(id), 1)
            response.push(id)
        }
        return response
    },

    acertou: async function(cpfLogado, jogoEmAndamento) {
        const pontuacao = jogoEmAndamento.dataValues.nivel * 10
        const novaPontuacao = await pontuacaoDAO.atualizar(
            jogoEmAndamento.dataValues.id, 
            jogoEmAndamento.dataValues.pontuacao + pontuacao, 
            jogoEmAndamento.dataValues.perguntasRespondidas + 1,
            jogoEmAndamento.dataValues.nivel,
            cpfLogado
        )
        return pontuacao
    },

    errou: async function(cpfLogado, jogoEmAndamento) {
        const novaPontuacao = await pontuacaoDAO.atualizar(
            jogoEmAndamento.dataValues.id, 
            jogoEmAndamento.dataValues.pontuacao, 
            jogoEmAndamento.dataValues.perguntasRespondidas + 1,
            jogoEmAndamento.dataValues.nivel,
            cpfLogado
        )
    },

    jogar: async function(cpfLogado, nivel) {
        if(await this.existeJogoEmAndamento(cpfLogado)) {
            return {status: 400, 
                data: "Não é possível criar um novo jogo para o usuário logado, pois já existe um jogo em andamento para ele"}
        }
        const perguntas = await perguntaDAO.getByNivel(nivel)

        if(perguntas.length < 3) {
            return {status: 400, 
                data: "Não existe 3 questões para o nível de dificuldade - cadastre novas questões para jogar"}
        }

        const ids_perguntas = perguntas.map(pergunta => pergunta.dataValues.id)
        const relacoes = await relacaoQnADAO.getRelacao(await this.capturaRandomIds(ids_perguntas))
        const novaPontuacao = await pontuacaoDAO.inserir(0, 0, nivel, cpfLogado)

        return {status: 200, data: relacoes}
    },

    jogando: async function(cpfLogado, id_pergunta, id_resposta) {
        if(await this.existeJogoEmAndamento(cpfLogado)) {
            if(await relacaoQnAService.existeId(id_pergunta, id_resposta)) {
                const jogoEmAndamento = await pontuacaoDAO.existeJogoEmAndamento(cpfLogado)
                const relacao = await relacaoQnADAO.getById(id_pergunta, id_resposta)
                if(relacao.dataValues.resposta_certa) {
                    return {status: 200, 
                        data: "Resposta correta! Voce fez " + await this.acertou(cpfLogado, jogoEmAndamento) + " pontos"}
                }
                await this.errou(cpfLogado, jogoEmAndamento)
                return {status: 200, data: "Resposta incorreta!"}
            }
            return {status: 404, data: "Não existe uma relação entre essa pergunta e essa resposta"}
        }
        return {status: 400, data: "Não existe um jogo em andamento para o usuário logado"}
    },

    fimDeJogo: async function(cpfLogado) {
        if(await this.existeJogoEmAndamento(cpfLogado)) {
            return {status: 400, data: "Você ainda não respondeu todas as perguntas."}
        }
        const pontuacao = await pontuacaoDAO.getUltimaPontuacao(cpfLogado)
        return {status: 200, data: "Sua pontuação total foi: " + pontuacao.dataValues.pontuacao}
    }

}