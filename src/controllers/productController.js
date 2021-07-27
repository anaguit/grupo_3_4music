const controladorProducto = {
        listadoProductos: (req, res) =>{
            res.render("products/all-items");
        },

        detalleProducto: (req, res) => {
            res.render("products/item-detail");
        },

        productoNuevo: (req, res) => {
            res.render("products/new-item");
        },

        almacenarNuevoProducto: (req, res) => {
            res.render("products/all-items"); //Provisorio. Luego debe almacenar en Json el nuevo producto
        },

        editarProducto: (req, res) => {
            res.render("products/edit-item");
        },

        almacenarProductoEditado: (req, res) => {
            res.render("products/new-item"); //Provisorio. Luego debe almacenar en Json el producto editado (Actualizar BD)
        },
        
        eliminarProducto: (req, res) => {
            res.render("products/all-items"); //Provisorio. Luego debe borrar de la BD (Json) el producto recibido por ID.
        }
}

module.exports = controladorProducto;