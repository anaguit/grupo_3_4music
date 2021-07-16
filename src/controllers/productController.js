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

        editarProducto: (req, res) => {
            res.render("products/edit-item");
        }
}

module.exports = controladorProducto;