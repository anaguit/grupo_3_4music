const controladorUsers = require (".././controllers/controladorUsers");

const express = require ("express");
const usersRouter = express.Router();

usersRouter.get("/", controladorUsers.login);

usersRouter.get("/profile", controladorUsers.perfil);

usersRouter.get("/register", controladorUsers.registro);





module.exports = usersRouter;