const usuarioDAO = require("../DAO/usuario-dao")

module.exports = {
    existeEmail: async function(email) {
        return await usuarioDAO.getByEmail(email) != null
    },

    existeCPF: async function(cpf) {
        return await usuarioDAO.getByCPF(cpf) != null
    },

    cadastrarUsuario: async function(cpf, nome, idade, email, senha, admin) {
        //validar se o usuario nao possui uma conta
        if (!await this.existeCPF(cpf)) {
            if (!await this.existeEmail(email)) {
                const usuario = await usuarioDAO.inserir(cpf, nome, idade, email, senha, admin)
                return {status: 201, data: usuario}
            }
            return {status: 409, data: "Já existe uma conta com esse usuario"}
        }
        return {status: 409, data: "Voce já possui uma conta"}
    },

}