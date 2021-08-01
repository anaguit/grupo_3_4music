// ************ Require's ************
const express = require ("express");
const usersRouter = express.Router();
const path = require('path');
const multer = require('multer');

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


/* Rutas */

/* Inicio de Sesion */
usersRouter.get("/", controladorUsers.login);

/* Vista Perfil de Usuario */
usersRouter.get("/profile", controladorUsers.perfil);

/* Editar Perfil de Usuario */
//crear todo...


/* Registración */
usersRouter.get("/register", controladorUsers.registro);
usersRouter.post("/register", uploadFile.single('avatar'), controladorUsers.crearNuevoUsuario);

/* Registración Exitosa */
usersRouter.get("/registracionOK", controladorUsers.registracionExitosa);






module.exports = usersRouter;