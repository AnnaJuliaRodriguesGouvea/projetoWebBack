const Joi = require("joi")

const limiteMinimo = 5
const limiteMedio = 10
const limiteMaximo = 30

module.exports = {
    validaId: function(req, res, next) {
        const {error, value} = Joi.number().integer().greater(0).required().validate(req.params.id)
        if(error) {
            return res.status(400).json({status: false, msg: "O id não pode ser nulo"})
        }

        req.body.id = value
        return next()
    },

    validaLimite: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.limite)
        if(error) {
            return res.status(400).json({status: false, msg: "O limite não pode ser nulo"})
        }

        if(req.query.limite != limiteMinimo && req.query.limite != limiteMedio && req.query.limite != limiteMaximo) {
            return res.status(400).json({status: false, msg: "O limite só pode ser 5, 10 ou 30"})
        }

        req.query.limite = value
        return next()
    },

    validaPagina: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.pagina)
        if(error) {
            return res.status(400).json({status: false, msg: "A pagina não pode ser nula"})
        }

        req.query.pagina = value
        return next()
    },

}