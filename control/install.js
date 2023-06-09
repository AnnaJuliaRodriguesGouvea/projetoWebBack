const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd-config")
const usuarioDAO = require("../DAO/usuario-dao")
const temaDAO = require("../DAO/tema-dao")
const perguntaDAO = require("../DAO/pergunta-dao")
const respostaDAO = require("../DAO/resposta-dao")
const relacaoQnADAO = require("../DAO/relacao-qna-dao")

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
        "A maldição de frankenstein",
        "A Nightmare on Elm Street",
        "Psicose",
        "Los Angeles",
        "New York",
        "Chicago"
    ]

    let respostasModel = []
    for (let i = 0; i < respostas.length; i++) {
        respostasModel.push(await respostaDAO.inserir(respostas[i]))
    }

    return respostasModel
}

async function inicializarPerguntaModel() {
    let pergunta = [
        ["Qual foi o primeiro filme de terror em cores?", 3, "Filme"],
        ["Qual filme de terror foi a estreia de Johnny Depp? ", 2, "Filme"],
        ["'Pretty Woman' se passa em qual cidade?", 1, "Cidade"],
        ["Que cidade é invadida por fantasmas em 'Ghostbusters'?", 1, "Cidade"],
        ["Qual foi o primeiro filme a mostrar uma descarga em um vaso sanitário?", 3, "Filme"]
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
        [1, 1],
        [2, 2],
        [3, 4],
        [4, 5],
        [5, 3]
    ]

    let relacaoModel = []
    for (let i = 0; i < relacaoCorreta.length; i++) {
        const idRespCorreta = relacaoCorreta[i][1]
        const respostas = await respostaDAO.listarTudo()
        for (let j = 0; j < respostas.length; j++) {
            if (respostas[j].id == idRespCorreta) {
                relacaoModel.push(await relacaoQnADAO.inserir(relacaoCorreta[i][0], respostas[j].id, true))
            } else {
                relacaoModel.push(await relacaoQnADAO.inserir(relacaoCorreta[i][0], respostas[j].id, false))
            }
        }
    }
    return relacaoModel
}

router.get('/', async (req, res) => {
    await sequelize.sync({force: true})

    const usuarios = await inicializarUsuarioModel()
    const temas = await inicializarTemaModel()
    const respostas = await inicializarRespostaModel()
    const perguntas = await inicializarPerguntaModel()
    const relacaoQnA = await inicializarRelacaoQnAModel()

    res.json({
        status: true, 
        usuarioAdmDefault: usuarios[0],
        usuarios: usuarios,
        temas: temas,
        perguntas: perguntas,
        respostas: respostas,
        relacaoQnA: relacaoQnA
    })
})

module.exports = router