const {body} = require("express-validator");

const validatedLogin = [
    body("email").notEmpty().withMessage("Debes escribir un correo electrónico").bail().isEmail().withMessage("Debes escribir un email válido"),
    body("contraseña").notEmpty().withMessage("Debes completar el campo de contraseña")  
]

module.exports = validatedLogin;