// ************ Require's ************
const express = require ("express");
const productRouter = express.Router();
const path = require('path');
const multer = require('multer');


// ************ Controller Require ************
const controladorProducto = require ("../controllers/productController");
const controladorUsers = require("../controllers/UserController");

/***  Multer configuration  ****/

const configuracionImagen = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images/products'));    // Ruta donde almacenamos la foto del producto
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: configuracionImagen });


/* Rutas */

/* Listar Todos los Productos */
productRouter.get("/", controladorProducto.listadoProductos); // Listado de Productos

/* Detalle de 1 Producto */
productRouter.get("/detail/:id", controladorProducto.detalleProducto); // Detalle de un producto particular


/* Publicar Nuevo Producto */

productRouter.get("/create", controladorProducto.productoNuevo); // Formulario de Creacion de Producto
productRouter.post("/", uploadFile.single('imagenes') , controladorProducto.almacenarNuevoProducto); // Almacenamiento del nuevo producto

productRouter.get("/all-ok", controladorProducto.publicacionExitosa); //Vista de Publicacion Exitosa


/* Editar Producto */
productRouter.get("/:id/edit", controladorProducto.editarProducto); // Formulario Edición del Producto
productRouter.put("/:id/edit", uploadFile.single('imagenes') ,controladorProducto.almacenarProductoEditado); // Guardar Producto Editado

/* Borrar Producto */
productRouter.delete("/:id", controladorProducto.eliminarProducto); // Eliminar un Producto 



module.exports = productRouter;