const Joi = require("joi")

module.exports = {
    validaRespostaCerta: function(req, res, next) {
        const {error, value} = Joi.boolean().required().validate(req.body.resposta_certa)
        if(error) {
            return res.status(400).json({status: false, msg: "A resposta correta não pode ser nula"})
        }

        req.body.resposta_certa = value
        return next()
    },

}