const express = require("express")
const router = express.Router()
const respostaService = require("../service/resposta-service")
const respostaValidator = require("../validator/resposta-validator")
const qnaValidator = require("../validator/qna-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const temaValidator = require("../validator/tema-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    qnaValidator.validaLimite,
    qnaValidator.validaPagina,
    async (req, res) => {
        const response = await respostaService.listarRespostas(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await respostaService.buscarId(req.body.id)
        res.status(response.status).json(response.data)
})

router.post("/",
    autenticacaoValidator.validarToken,
    respostaValidator.validaResposta,
    async (req, res) => {
        const response = await respostaService.cadastrarResposta(req.cpfLogado, req.body.resposta)
        res.status(response.status).json(response.data)
})

router.put("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    respostaValidator.validaResposta,
    async (req, res) => {
        const response = await respostaService.atualizarResposta(
            req.cpfLogado,
            req.body.id,
            req.body.resposta
        )
        res.status(response.status).json(response.data)
})

router.delete("/:id", 
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await respostaService.excluirResposta(req.cpfLogado, req.body.id)
        res.status(response.status).json(response.data)
})

module.exports = router