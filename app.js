//Configurando express
const express = require("express")
const app = express()

//Configuração .env
require("dotenv").config()

//Configurando arquivos públicos e body parser
const path = require("path")
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})