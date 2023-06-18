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
app.use("/api/pergunta", require("./control/pergunta-controller"))
app.use("/api/resposta", require("./control/resposta-controller"))
app.use("/api/tema", require("./control/tema-controller"))
app.use("/api/relacao-qna", require("./control/relacao-qna-controller"))
app.use("/api/pontuacao", require("./control/pontuacao-controller"))
app.use("/api/quiz", require("./control/quiz-controller"))

app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})