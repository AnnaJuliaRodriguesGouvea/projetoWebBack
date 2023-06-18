const express = require("express")
const router = express.Router()
const pontuacaoService = require("../service/pontuacao-service")
const qnaValidator = require("../validator/qna-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const pontuacaoValidator = require("../validator/pontuacao-validator")
const usuarioValidator = require("../validator/usuario-validator")
const perguntaValidator = require("../validator/pergunta-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    qnaValidator.validaLimite,
    qnaValidator.validaPagina,
    async (req, res) => {
        const response = await pontuacaoService.listarPontuacao(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await pontuacaoService.buscarId(req.body.id)
        res.status(response.status).json(response.data)
})

router.get("/cpf/:cpf",
    autenticacaoValidator.validarToken,
    qnaValidator.validaLimite,
    qnaValidator.validaPagina,
    usuarioValidator.validaCpf,
    async (req, res) => {
        const response = await pontuacaoService.buscarPorCpf(req.query.limite, req.query.pagina, req.body.cpf)
        res.status(response.status).json(response.data)
})

router.post("/",
    autenticacaoValidator.validarToken,
    pontuacaoValidator.validaPontuacao,
    pontuacaoValidator.validaPerguntasRespondidas,
    perguntaValidator.validaNivel,
    usuarioValidator.validaCpf,
    async (req, res) => {
        const response = await pontuacaoService.cadastrarPontuacao(
            req.cpfLogado, 
            req.body.pontuacao,
            req.body.perguntasRespondidas,
            req.body.nivel,
            req.body.cpf
        )
        res.status(response.status).json(response.data)
})

router.put("/:id",
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    pontuacaoValidator.validaPontuacao,
    pontuacaoValidator.validaPerguntasRespondidas,
    perguntaValidator.validaNivel,
    usuarioValidator.validaCpf,
    async (req, res) => {
        const response = await pontuacaoService.atualizarPontuacao(
            req.cpfLogado,
            req.body.id,
            req.body.pontuacao,
            req.body.perguntasRespondidas,
            req.body.nivel,
            req.body.cpf
        )
        res.status(response.status).json(response.data)
})

router.delete("/:id", 
    autenticacaoValidator.validarToken,
    qnaValidator.validaId,
    async (req, res) => {
        const response = await pontuacaoService.excluirPontuacao(req.cpfLogado, req.body.id)
        res.status(response.status).json(response.data)
})

module.exports = router