var jwt = require('jsonwebtoken')
const usuarioService = require("../service/usuario-service")

// async function validarLogin(email, senha) {
//     const usuario = await usuarioService.getUsuarioByEmail(email)
//     if (usuario != null)
//         return usuario.senha === senha
//     return false
// }

module.exports = {
    login: async function(email, senha) {
        var usuario = await usuarioService.getUsuarioByEmail(email)
        if (usuario != null) {
            if (usuario.senha === senha) {
                let token = jwt.sign({cpfLogado: usuario.cpf}, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })
                return ({status: 200, data: token})
            } else {
                return {status: 400, data: "Senha incorreta"}
            }
        } else {
            return {status: 404, data: "Esse usuario não existe"}
        }
    }
}