const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd-config")
const usuarioDAO = require("../DAO/usuario-dao")
const temaDAO = require("../DAO/tema-dao")

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

router.get('/', async (req, res) => {
    await sequelize.sync({force: true})

    const usuarios = await inicializarUsuarioModel()
    const temas = await inicializarTemaModel()

    res.json({
        status: true, 
        usuarioAdmDefault: usuarios[0],
        usuarios: usuarios,
        temas: temas
    })
})

module.exports = router