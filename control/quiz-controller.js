const express = require("express")
const router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const perguntaValidator = require("../validator/pergunta-validator")
const respostaValidator = require("../validator/resposta-validator")
const quizService = require("../service/quiz-service")

router.post("/jogar",
    autenticacaoValidator.validarToken,
    perguntaValidator.validaNivel,
    async (req, res) => {
        const response = await quizService.jogar(req.cpfLogado, req.body.nivel)
        res.status(response.status).json(response.data)
})

router.post("/jogando",
    autenticacaoValidator.validarToken,
    perguntaValidator.validaIdPergunta,
    respostaValidator.validaIdResposta,
    async (req, res) => {
        const response = await quizService.jogando(req.cpfLogado, req.body.id_pergunta, req.body.id_resposta)
        res.status(response.status).json(response.data)
})

router.get("/fim-de-jogo",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await quizService.fimDeJogo(req.cpfLogado)
        res.status(response.status).json(response.data)
})

module.exports = router