const controladorCarrito = require ("../controllers/cartController");

const express = require ("express");
const cartRouter = express.Router();

cartRouter.get("/", controladorCarrito.vistaCarrito);


module.exports = cartRouter;