const Joi = require("joi")

module.exports = {
    validaPontuacao: function(req, res, next) {
        const {error, value} = Joi.number().integer().greater(0).required().validate(req.body.pontuacao)
        if(error) {
            return res.status(400).json({status: false, msg: "A pontuação não pode ser nula"})
        }

        req.body.pontuacao = value
        return next()
    },

    validaPerguntasRespondidas: function(req, res, next) {
        const {error, value} = Joi.number().integer().greater(0).required().validate(req.body.perguntasRespondidas)
        if(error) {
            return res.status(400).json({status: false, msg: "A quantidade de perguntas respondidas não pode ser nula"})
        }

        req.body.perguntasRespondidas = value
        return next()
    },
}