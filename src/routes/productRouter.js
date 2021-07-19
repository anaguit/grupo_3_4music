const controladorProducto = require ("../controllers/productController");

const express = require ("express");
const productRouter = express.Router();

productRouter.get("/", controladorProducto.listadoProductos);

productRouter.get("/detalle", controladorProducto.detalleProducto);

productRouter.get("/nuevoProducto", controladorProducto.productoNuevo);

productRouter.get("/edicionProducto", controladorProducto.editarProducto);




module.exports = productRouter;