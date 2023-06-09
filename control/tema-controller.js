const express = require("express")
const router = express.Router()
const temaService = require("../service/tema-service")
const qnaValidator = require("../validator/qna-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const temaValidator = require("../validator/tema-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    qnaValidator.validaLimite,
    qnaValidator.validaPagina,
    async (req, res) => {
        const response = await temaService.listarTema(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await temaService.buscarId(req.body.id)
        res.status(response.status).json(response.data)
})

router.post("/",
    autenticacaoValidator.validarToken,
    temaValidator.validaTema,
    async (req, res) => {
        const response = await temaService.cadastrarTema(req.cpfLogado, req.body.tema)
        res.status(response.status).json(response.data)
})

router.put("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    temaValidator.validaTema,
    async (req, res) => {
        const response = await temaService.atualizarTema(
            req.cpfLogado,
            req.body.id,
            req.body.tema
        )
        res.status(response.status).json(response.data)
})

router.delete("/:id", 
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await temaService.excluirTema(req.cpfLogado, req.body.id)
        res.status(response.status).json(response.data)
})

module.exports = router