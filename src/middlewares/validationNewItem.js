const {body} = require("express-validator");

const validatedNewItem = [
    body("titulo").notEmpty().withMessage("Debes completar el campo de titulo de producto"),
    body("marca").notEmpty().withMessage("Debes completar el campo de marca"),
    body("modelo").notEmpty().withMessage("Debes escribir el campo de modelo"),
    body("precio").notEmpty().withMessage("Ingresa el precio del articulo").bail().isNumeric().withMessage("Ingresa un precio válido"),
    body("categoria").notEmpty().withMessage("Elegí la categoría"),
    body("descripcion").notEmpty().withMessage("Completa una descripción del artículo"),
    body("imagenes").optional().custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error("Tienes que subir una imagen")
        }
    }),
    body("generoMusical").notEmpty().withMessage("Elegí el género musical"),
    body("stock").notEmpty().withMessage("Ingresá el stock disponible").bail().isNumeric().withMessage("Ingresa un valor válido")
]

module.exports = validatedNewItem;
