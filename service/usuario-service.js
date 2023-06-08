const usuarioDAO = require("../DAO/usuario-dao")

async function atualizarDadosUsuario(cpf, nome, idade, email, senha, admin) {
    return await usuarioDAO.atualizar(cpf, nome, idade, email, senha, admin)
}

async function excluirDadosUsuario(cpf) {
    return await usuarioDAO.excluir(cpf)
}

module.exports = {
    getUsuarioByEmail: async function(email) {
        return await usuarioDAO.getByEmail(email)
    },

    getUsuarioByCpf: async function(cpf) {
        return await usuarioDAO.getByCPF(cpf)
    },

    existeEmail: async function(email) {
        return await usuarioDAO.getByEmail(email) != null
    },

    existeCPF: async function(cpf) {
        return await usuarioDAO.getByCPF(cpf) != null
    },

    isAdmin: async function(cpf) {
        const usuario = await this.getUsuarioByCpf(cpf)
        if (usuario) {
            return usuario.admin
        }

        return false
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

    atualizarUsuario: async function(cpfLogado, cpf, nome, idade, email, senha, admin) {
        if(await this.isAdmin(cpfLogado)) {
            if(await this.existeCPF(cpf)) {
                const [response] = await atualizarDadosUsuario(cpf, nome, idade, email, senha, admin)
                return {status: 200, data: response}
            }
            return {status: 404, data: "Não existe um usuario com esse cpf"}
        }

        if(cpfLogado === cpf) {
            if(admin === true) {
                return {status: 403, data: "Você não possui permissão para alterar sua própria permissão"}
            }
            const [response] = await atualizarDadosUsuario(cpf, nome, idade, email, senha, admin)
            return {status: 200, data: response}
        }
        return {status: 403, data: "Você não possui permissão para alterar outro usuário"}
    },

    excluirUsuario: async function(cpfLogado, cpf) {
        if(await this.isAdmin(cpfLogado)) {
            if(await this.existeCPF(cpf)) {
                const response = await excluirDadosUsuario(cpf)
                return {status: 200, data: response}
            }
            return {status: 404, data: "Não existe um usuario com esse cpf"}
        }

        if(cpfLogado === cpf) {
            const response = await excluirDadosUsuario(cpf)
            return {status: 200, data: response}
        }
        return {status: 403, data: "Você não possui permissão para excluir outro usuário"}
    }
}