const express = require("express")
const router = express.Router()
const relacaoQnAService = require("../service/relacao-qna-service")
const qnaValidator = require("../validator/qna-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const relacaoQnAValidator = require("../validator/relacao-qna-validator")
const perguntaValidator = require("../validator/pergunta-validator")
const respostaValidator = require("../validator/resposta-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    qnaValidator.validaLimite,
    qnaValidator.validaPagina,
    async (req, res) => {
        const response = await relacaoQnAService.listarRelacoes(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:id_pergunta/:id_resposta",
    autenticacaoValidator.validarToken,
    perguntaValidator.validaIdPergunta,
    respostaValidator.validaIdResposta,
    async (req, res) => {
        const response = await relacaoQnAService.buscarId(req.body.id_pergunta, req.body.id_resposta)
        res.status(response.status).json(response.data)
})

router.post("/",
    autenticacaoValidator.validarToken,
    perguntaValidator.validaIdPergunta,
    respostaValidator.validaIdResposta,
    relacaoQnAValidator.validaRespostaCerta,
    async (req, res) => {
        const response = await relacaoQnAService.cadastrarRelacao(
            req.cpfLogado,
            req.body.id_pergunta,
            req.body.id_resposta,
            req.body.resposta_certa
        )
        res.status(response.status).json(response.data)
})

router.put("/:id_pergunta/:id_resposta",
    autenticacaoValidator.validarToken,
    perguntaValidator.validaIdPergunta,
    respostaValidator.validaIdResposta,
    relacaoQnAValidator.validaRespostaCerta,
    async (req, res) => {
        const response = await relacaoQnAService.atualizarRelacao(
            req.cpfLogado,
            req.body.id_pergunta,
            req.body.id_resposta,
            req.body.resposta_certa
        )
        res.status(response.status).json(response.data)
})

router.delete("/:id_pergunta/:id_resposta", 
    autenticacaoValidator.validarToken,
    perguntaValidator.validaIdPergunta,
    respostaValidator.validaIdResposta,
    async (req, res) => {
        const response = await relacaoQnAService.excluirRelacao(
            req.cpfLogado,
            req.body.id_pergunta,
            req.body.id_resposta
        )
        res.status(response.status).json(response.data)
})

module.exports = router