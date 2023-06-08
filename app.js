//Configurando express
const express = require("express")
const app = express()

//Configuração .env
require("dotenv").config()

//Configurando arquivos públicos e body parser
const path = require("path")
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//Definindo rotas
app.use("/install", require('./control/install'))
app.use("/", require("./control/autenticacao-controller"))
app.use("/api/usuario", require('./control/usuario-controller'))

app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})