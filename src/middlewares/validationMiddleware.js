const {body} = require("express-validator");

function validationMiddleware (req, res, next) {
    const validatedRegister = [
        body("nombre").notEmpty().withMessage("Debes completar el campo de nombre"),
        body("apellido").notEmpty().withMessage("Debes completar el campo de apellido"),
        body("email").notEmpty().withMessage("Debes escribir un correo electrónico").bail().isEmail().withMessage("Debes escribir un email válido"),
        body("telefono").notEmpty().withMessage("Ingresa un número de telefono").bail().isNumeric().withMessage("Ingresa un número de telefono válido"),
        body("contraseña").notEmpty().withMessage("Debes completar el campo de contraseña"),
        body("avatar").optional().custom((value, { req }) => {
            let file = req.file;
            if (!file) {
                throw new Error("Tienes que subir una imagen")
            }
        })
        
    ]
    next();
}

module.exports = validationMiddleware;


