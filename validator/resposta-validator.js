const Joi = require("joi")

module.exports = {
    validaIdResposta: function(req, res, next) {
        let id_resposta = null
        if(req.body.id_resposta)
            id_resposta = req.body.id_resposta
        else if(req.params.id_resposta)
            id_resposta = req.params.id_resposta
        else
            id_resposta = req.query.id_resposta
        
        const {error, value} = Joi.number().integer().greater(0).required().validate(id_resposta)
        if(error) {
            return res.status(400).json({status: false, msg: "O id da resposta não pode ser nulo e/ou deve ser um número inteiro"})
        }

        req.body.id_resposta = value
        return next()
    },

    validaResposta: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.resposta)
        if(error) {
            return res.status(400).json({status: false, msg: "A resposta não pode ser nula"})
        }

        req.body.resposta = value
        return next()
    },
}