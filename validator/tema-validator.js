const Joi = require("joi")

module.exports = {
    validaIdTema: function(req, res, next) {
        const {error, value} = Joi.number().integer().greater(0).required().validate(req.body.id_tema)
        if(error) {
            return res.status(400).json({status: false, msg: "O id do tema não pode ser nulo"})
        }

        req.body.id_tema = value
        return next()
    },

    validaTema: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.tema)
        if(error) {
            return res.status(400).json({status: false, msg: "O tema não pode ser nulo"})
        }

        req.body.tema = value
        return next()
    },
}