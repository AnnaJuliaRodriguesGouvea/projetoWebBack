var jwt = require('jsonwebtoken')

module.exports = {
    validarToken: async function(req, res, next) {
        let token = req.headers['authorization']
        if (!token)
            token = ''
        token = token.split('Bearer ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                console.log(err)
                res.status(403).json({status: false, msg: "Acesso negado - Token invalido"})
                return
            }
            req.cpfLogado = payload.cpfLogado
            next()
        })
    },

}