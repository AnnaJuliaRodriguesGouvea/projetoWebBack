const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd-config")
const usuarioDAO = require("../DAO/usuario-dao")
const temaDAO = require("../DAO/tema-dao")
const perguntaDAO = require("../DAO/pergunta-dao")
const respostaDAO = require("../DAO/resposta-dao")
const relacaoQnADAO = require("../DAO/relacao-qna-dao")
const pontuacaoDAO = require("../DAO/pontuacao-dao")

async function inicializarUsuarioModel() {
    let usuarios = [
        ["11122233344", "Administrador Default", 18, "adm.default@gmail.com", "admin123", true],
        ["12345678910", "Usuario 1", "20", "usuario1@gmail.com", "user1", false],
        ["12213314455", "Usuario 2", "27", "usuario2@gmail.com", "user2", false],
        ["55566677788", "Usuario 3", "39", "usuario3@gmail.com", "user3", false],
        ["45678912300", "Usuario 4", "23", "usuario4@gmail.com", "user4", false],
    ]

    let usuariosModel = []
    for (let i = 0; i < usuarios.length; i++) {
        usuariosModel.push(await usuarioDAO.inserir(
            usuarios[i][0],
            usuarios[i][1],
            usuarios[i][2],
            usuarios[i][3],
            usuarios[i][4],
            usuarios[i][5]
        ))
    }

    return usuariosModel
}

async function inicializarTemaModel() {
    let temas = [
        "Filme", "Ator", "Cidade", "Cor", "Ano"
    ]

    let temasModel = []
    for (let i = 0; i < temas.length; i++) {
        temasModel.push(await temaDAO.inserir(temas[i].toLowerCase()))
    }

    return temasModel
}

async function inicializarRespostaModel() {
    let respostas = [
        "Expecto Patronum", "Avada Kedavra", "Expelliarmus",
        "2014", "2022", "2023", 
        "2019", "2018", "2017",
        "Star Wars: A Ameaça Fantasma", "Star Wars: Uma Nova Esperança", "Star Wars: O Império Contra-Ataca",
        "Homem de Ferro", "Capitão América: O Primeiro Vingador", "Thor"
    ]

    let respostasModel = []
    for (let i = 0; i < respostas.length; i++) {
        respostasModel.push(await respostaDAO.inserir(respostas[i]))
    }

    return respostasModel
}

async function inicializarPerguntaModel() {
    let pergunta = [
        ["Qual feitiço para desarmar o seu oponente, em Harry Potter?", 2, "Filme"],
        ["Quando foi lançado o filme Avatar 2?", 1, "Ano"],
        ["Quando foi lançado o filme Vingadores Ultimato?", 1, "Ano"],
        ["Qual o primeiro filme da franquia Star Wars?", 2, "Filme"],
        ["Qual o primeiro filme do Universo Cinematográfico Marvel(MCU)?", 2, "Filme"]
    ]

    let perguntasModel = []
    for (let i = 0; i < pergunta.length; i++) {
        let temaModel = await temaDAO.getByTema(pergunta[i][2].toLowerCase())
        perguntasModel.push(await perguntaDAO.inserir(pergunta[i][0], pergunta[i][1], temaModel.id))
    }

    return perguntasModel
}

async function inicializarRelacaoQnAModel() {
    let relacaoCorreta = [
        [1, 1, false], [1, 2, false], [1, 3, true],
        [2, 4, false], [2, 5, true], [2, 6, false],
        [3, 7, true], [3, 8, false], [3, 9, false],
        [4, 10, false], [4, 11, true], [4, 12, false],
        [5, 13, true], [5, 14, false], [5, 15, false]
    ]

    let relacaoModel = []
    for (let i = 0; i < relacaoCorreta.length; i++) {
        relacaoModel.push(await relacaoQnADAO.inserir(relacaoCorreta[i][0], relacaoCorreta[i][1], relacaoCorreta[i][2]))
    }
    return relacaoModel
}

async function inicializarPontuacaoModel() {
    let pontuacao = [
        [90, 3, 3, "11122233344"],
        [10, 3, 1, "12345678910"],
        [30, 3, 1, "12213314455"],
        [20, 3, 2, "55566677788"],
        [40, 3, 2, "45678912300"]
    ]

    let pontuacaoModel = []
    for (let i = 0; i < pontuacao.length; i++) {
        pontuacaoModel.push(await pontuacaoDAO.inserir(pontuacao[i][0], pontuacao[i][1], pontuacao[i][2], pontuacao[i][3]))
    }

    return pontuacaoModel
}

router.get('/', async (req, res) => {
    await sequelize.sync({force: true})

    const usuarios = await inicializarUsuarioModel()
    const temas = await inicializarTemaModel()
    const respostas = await inicializarRespostaModel()
    const perguntas = await inicializarPerguntaModel()
    const relacaoQnA = await inicializarRelacaoQnAModel()
    const pontuacoes = await inicializarPontuacaoModel()

    res.json({
        status: true, 
        usuarioAdmDefault: usuarios[0],
        usuarios: usuarios,
        temas: temas,
        perguntas: perguntas,
        respostas: respostas,
        relacaoQnA: relacaoQnA,
        pontuacoes: pontuacoes
    })
})

module.exports = router