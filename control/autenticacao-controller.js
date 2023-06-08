var express = require('express')
var router = express.Router()
const autenticacaoService = require("../service/autenticacao-service")

router.post('/login', async function(req, res) {
    const response = await autenticacaoService.login(req.body.email, req.body.senha)
    res.status(response.status).json(response.data)
})

module.exports = router