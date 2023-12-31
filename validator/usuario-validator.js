const Joi = require("joi")
const usuarioService = require("../service/usuario-service")

module.exports = {
    validaCpf: function(req, res, next) {
        let cpf = null
        if(req.body.cpf)
            cpf = req.body.cpf
        else
            cpf = req.params.cpf

        if (!cpf) {
            return res.status(400).json({status: false, msg: "O cpf não pode ser nulo"})
        }

        const {error, value} = Joi.string().validate(cpf)
        if(error) {
            return res.status(400).json({status: false, msg: "O cpf deve ser uma string"})
        }

        if (cpf.length != 11) {
            cpf = cpf.replaceAll(".", "")
            cpf = cpf.replaceAll("-", "")
            const {error, value} = Joi.string().length(11).required().validate(cpf)
            if(error) {
                return res.status(400).json({status: false, msg: "O cpf não é válido"})
            }
        }

        req.body.cpf = cpf
        return next()
    },
    
    validaNome: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.nome)
        if(error) {
            return res.status(400).json({status: false, msg: "O nome não pode ser nulo"})
        }
        req.body.nome = value
        return next()
    },
    
    validaIdade: function(req, res, next) {
        const {error, value} = Joi.number().integer().greater(0).required().validate(req.body.idade)
        if(error) {
            return res.status(400).json({status: false, msg: "A idade não pode ser nulo"})
        }
        req.body.idade = value
        return next()
    },
    
    validaEmail: function(req, res, next) {
        const {error, value} = Joi.string().email().required().validate(req.body.email)
        if(error) {
            return res.status(400).json({status: false, msg: "O email não pode ser nulo"})
        }
        req.body.email = value
        return next()
    },
    
    validaSenha: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.senha)
        if(error) {
            return res.status(400).json({status: false, msg: "A senha não pode ser nula"})
        }
        req.body.senha = value
        return next()
    },

    validaAdmin: function(req, res, next) {
        const {error, value} = Joi.boolean().required().validate(req.body.admin)
        if(error) {
            return res.status(400).json({status: false, msg: "Admin não pode ser nula"})
        }
        req.body.admin = value
        return next()
    },

    validaIsAdmin: async function(req, res, next) {
        if (await usuarioService.isAdmin(req.cpfLogado))
            next()
        else
            res.status(403).json({status: false, msg: "Usuário logado não é um administrador"})
    },
}