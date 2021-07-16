const controlador = require ("./../controllers/controlador");

const express = require ("express");
const router = express.Router();

router.get("/", controlador.index);

//router.get("/login", controlador.login);

//router.get("/registro", controlador.registro);

//router.get("/detalles", controlador.detalleItems);

router.get("/carrito", controlador.carrito);

module.exports = router;