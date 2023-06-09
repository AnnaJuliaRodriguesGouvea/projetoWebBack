const express = require("express")
const router = express.Router()
const perguntaService = require("../service/pergunta-service")
const qnaValidator = require("../validator/qna-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const perguntaValidator = require("../validator/pergunta-validator")
const temaValidator = require("../validator/tema-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    qnaValidator.validaLimite,
    qnaValidator.validaPagina,
    async (req, res) => {
        const response = await perguntaService.listarPerguntas(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await perguntaService.buscarId(req.body.id)
        res.status(response.status).json(response.data)
})

router.post("/",
    autenticacaoValidator.validarToken,
    perguntaValidator.validaQuestao,
    perguntaValidator.validaNivel,
    temaValidator.validaIdTema,
    async (req, res) => {
        const response = await perguntaService.cadastrarPergunta(req.cpfLogado, req.body.questao, req.body.nivel, req.body.id_tema)
        res.status(response.status).json(response.data)
})

router.put("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    perguntaValidator.validaQuestao,
    perguntaValidator.validaNivel,
    temaValidator.validaIdTema,
    async (req, res) => {
        const response = await perguntaService.atualizarPergunta(
            req.cpfLogado,
            req.body.id,
            req.body.questao,
            req.body.nivel,
            req.body.id_tema
        )
        res.status(response.status).json(response.data)
})

router.delete("/:id", 
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await perguntaService.excluirPergunta(req.cpfLogado, req.body.id)
        res.status(response.status).json(response.data)
})

module.exports = router