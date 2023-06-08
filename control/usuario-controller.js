const express = require("express")
const router = express.Router()
const usuarioValidator = require("../validator/usuario-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const usuarioService = require("../service/usuario-service")

router.post("/",
    usuarioValidator.validaCpf,
    usuarioValidator.validaNome,
    usuarioValidator.validaIdade,
    usuarioValidator.validaEmail,
    usuarioValidator.validaSenha,
    async (req, res) => {
        const response = await usuarioService.cadastrarUsuario(
            req.body.cpf,
            req.body.nome,
            req.body.idade,
            req.body.email,
            req.body.senha, 
            false
        )
        res.status(response.status).json(response.data)
})

router.post("/admin",
    autenticacaoValidator.validarToken,
    usuarioValidator.validaIsAdmin,
    usuarioValidator.validaCpf,
    usuarioValidator.validaNome,
    usuarioValidator.validaIdade,
    usuarioValidator.validaEmail,
    usuarioValidator.validaSenha,
    async (req, res) => {
        const response = await usuarioService.cadastrarUsuario(
            req.body.cpf,
            req.body.nome,
            req.body.idade,
            req.body.email,
            req.body.senha,
            true
        )
        res.status(response.status).json(response.data)
})

module.exports = router