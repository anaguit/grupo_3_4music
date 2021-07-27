const controladorProducto = require ("../controllers/productController");

const express = require ("express");
const productRouter = express.Router();

productRouter.get("/", controladorProducto.listadoProductos); // Listado de Productos


productRouter.get("/:id", controladorProducto.detalleProducto); // Detalle de un producto particular


productRouter.get("/create", controladorProducto.productoNuevo); // Formulario de Creacion de Producto
productRouter.post("/", controladorProducto.almacenarNuevoProducto); // Almacenamiento del nuevo producto


productRouter.get("/:id/edit", controladorProducto.editarProducto); // Formulario Edición del Producto
productRouter.put("/:id", controladorProducto.almacenarProductoEditado); // Guardar Producto Editado


productRouter.delete("/:id", controladorProducto.eliminarProducto); // Eliminar un Producto 



module.exports = productRouter;