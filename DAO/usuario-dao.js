const UsuarioModel = require("../model/Usuario.js")

module.exports = {
    listar: async function() {
        const usuarios = await UsuarioModel.findAll()
        return usuarios
    },
    
    inserir: async function(cpf, nome, idade, email, senha, admin) {
        const usuario = await UsuarioModel.create({
            cpf: cpf,
            nome: nome,
            idade: idade,
            email: email,
            senha: senha,
            admin: admin
        })
        
        return usuario
    },

    atualizar: async function(cpf, nome, idade, email, senha, admin) {
        return await UsuarioModel.update(
            {
                nome: nome,
                idade: idade,
                email: email,
                senha: senha,
                admin: admin
            }, {
                where: { cpf: cpf }
            }
        )
    },

    excluir: async function(cpf) {
        return await UsuarioModel.destroy({where: { cpf: cpf }})
    },

    getByCPF: async function(cpf) {
        return await UsuarioModel.findByPk(cpf)
    },

    getByEmail: async function(email) {
        return await UsuarioModel.findOne({ where: { email: email } })
    },
}