// ************ Require's ************
const express = require ("express");
const usersRouter = express.Router();
const path = require('path');
const multer = require('multer');
const {body} = require("express-validator");

// ************ Controller Require ************
const controladorUsers = require ("../controllers/UserController");


//***  Multer configuration  ****/

const configuracionImagen = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images/users'));    // Ruta donde almacenamos la foto de perfil
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: configuracionImagen });

/* VALIDACIONES */
const validatedRegister = [
    body("nombre").notEmpty().withMessage("Debes completar el campo de nombre"),
    body("apellido").notEmpty().withMessage("Debes completar el campo de apellido"),
    body("email").notEmpty().withMessage("Debes escribir un correo electrónico").bail().isEmail().withMessage("Debes escribir un email válido"),
    body("telefono").notEmpty().withMessage("Ingresa un número de telefono").bail().isNumeric().withMessage("Ingresa un número de telefono válido"),
    body("password").notEmpty().withMessage("Debes completar el campo de contraseña"),
    body("avatar").optional().bail().custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error("Tienes que subir una imagen")
        }
    })
    
]

/* Rutas */

/* Inicio de Sesion */
usersRouter.get("/", controladorUsers.login);

/* Vista Perfil de Usuario */
usersRouter.get("/profile", controladorUsers.perfil);

/* Editar Perfil de Usuario */
//crear todo...


/* Registración */
usersRouter.get("/register", controladorUsers.registro);
usersRouter.post("/register", uploadFile.single('avatar'), validatedRegister, controladorUsers.crearNuevoUsuario);

/* Registración Exitosa */
usersRouter.get("/registracionOK", controladorUsers.registracionExitosa);






module.exports = usersRouter;