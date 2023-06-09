const Joi = require("joi")

module.exports = {
    validaIdPergunta: function(req, res, next) {
        let id_pergunta = null
        if(req.body.id_pergunta)
            id_pergunta = req.body.id_pergunta
        else if(req.params.id_pergunta)
            id_pergunta = req.params.id_pergunta
        else
            id_pergunta = req.query.id_pergunta

        const {error, value} = Joi.number().integer().greater(0).required().validate(id_pergunta)
        if(error) {
            return res.status(400).json({status: false, msg: "O id da pergunta não pode ser nulo"})
        }

        req.body.id_pergunta = value
        return next()
    },

    validaQuestao: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.questao)
        if(error) {
            return res.status(400).json({status: false, msg: "A questão não pode ser nula"})
        }

        req.body.questao = value
        return next()
    },

    validaNivel: function(req, res, next) {
        const {error, value} = Joi.number().integer().min(1).max(3).required().validate(req.body.nivel)
        if(error) {
            if(req.body.nivel < 1 || req.body.nivel > 3)
                return res.status(400).json({status: false, msg: "O nivel deve ser de 1 a 3 - sendo 1 (Fácil), 2 (Médio) e 3 (Dificil)"})
            return res.status(400).json({status: false, msg: "O nivel não pode ser nulo"})
        }

        req.body.nivel = value
        return next()
    },
}