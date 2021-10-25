// ************ Require's ************
const express = require ("express");
const usersRouter = express.Router();
const path = require('path');
const multer = require('multer');
//const {body} = require("express-validator");

// ************ Controller Require ************
const controladorUsers = require ("../controllers/UserController");

// ************ Middlewares de Ruta ************
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const validationRegister = require("../middlewares/validationMiddleware");
const validationLogin = require("../middlewares/validationLogin");



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



/* Rutas */

/* Inicio de Sesion */
usersRouter.get("/", guestMiddleware, controladorUsers.login); //Si esta Logueado, el Middleware me redirije al Perfil
usersRouter.post("/", validationLogin, controladorUsers.ingresar);

/*Rutas APIS*/

usersRouter.get("/list", controladorUsers.listadoUsuarios);
usersRouter.get("/show/:id", controladorUsers.usuario)


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
usersRouter.post("/register", uploadFile.single('avatar'), validationRegister, controladorUsers.crearNuevoUsuario);

/* Registración Exitosa */
usersRouter.get("/registracionOK", controladorUsers.registracionExitosa);








module.exports = usersRouter;