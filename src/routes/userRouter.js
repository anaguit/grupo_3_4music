// ************ Require's ************
const express = require ("express");
const usersRouter = express.Router();
const path = require('path');
const multer = require('multer');
const {body} = require("express-validator");

// ************ Controller Require ************
const controladorUsers = require ("../controllers/UserController");

// ************ Middlewares de Ruta ************
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");


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
    body("contraseña").notEmpty().withMessage("Debes completar el campo de contraseña"),
    body("avatar").optional().custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error("Tienes que subir una imagen")
        }
    })
    
]

const validatedLogin = [
    body("email").notEmpty().withMessage("Debes escribir un correo electrónico").bail().isEmail().withMessage("Debes escribir un email válido"),
    body("contraseña").notEmpty().withMessage("Debes completar el campo de contraseña")  
]

/* Rutas */

/* Inicio de Sesion */
usersRouter.get("/", guestMiddleware, controladorUsers.login); //Si esta Logueado, el Middleware me redirije al Perfil
usersRouter.post("/", validatedLogin, controladorUsers.ingresar);

/* Cerrar Sesion */
usersRouter.get("/logout", controladorUsers.cerrarSesion);


/* Vista Perfil de Usuario */
usersRouter.get("/profile", authMiddleware, controladorUsers.perfil);


/* Detalle Datos de Usuario */
usersRouter.get("/userData/:id", authMiddleware, controladorUsers.datosUsuario);

/* Editar Perfil de Usuario */
usersRouter.get("/:id/edit", authMiddleware, controladorUsers.modificarDatos);
usersRouter.put("/:id/edit", uploadFile.single('avatar') ,controladorUsers.almacenarUsuarioEditado); // Guardar Producto Editado

/* Borrar Usuario */
usersRouter.delete("/:id", controladorUsers.eliminarCuenta); // Eliminar un Producto 


/* Registración */
usersRouter.get("/register", guestMiddleware, controladorUsers.registro);
usersRouter.post("/register", uploadFile.single('avatar'), validatedRegister, controladorUsers.crearNuevoUsuario);

/* Registración Exitosa */
usersRouter.get("/registracionOK", controladorUsers.registracionExitosa);






module.exports = usersRouter;