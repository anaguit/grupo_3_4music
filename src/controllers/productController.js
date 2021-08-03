/* Requires */
const fs = require('fs');
const path = require('path');


/* Lectura de Productos del Json */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controladorProducto = {
        listadoProductos: (req, res) =>{
            productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            res.render("all-items", {productos: productos});
        },

        detalleProducto: (req, res) => {
            
            let idURL = req.params.id;
            let productoEncontrado;

            for (let p of productos){
                if (p.id==idURL){
                    productoEncontrado=p;
                    break;
                }
            }
            res.render("item-detail", {productoDetalle: productoEncontrado});
        },

        productoNuevo: (req, res) => {
            res.render("new-item");
        },

        almacenarNuevoProducto: (req, res) => {
            idNuevo=0;

            for (let i of productos){
                if (idNuevo<i.id){
                    idNuevo=i.id;
                }
            }

            idNuevo++;

            let nombreImagen = req.file.filename;
            

            let productoNuevo =  {
                id:   idNuevo,
                titulo: req.body.titulo ,    
                marca: req.body.marca ,
                modelo: req.body.modelo ,
                precio: req.body.precio,
                categoria: req.body.categoria,
                descripcion: req.body.descripcion,
                dimensiones: req.body.dimensiones,
                materiales:req.body.materiales,
                imagen: nombreImagen
            };

            productos.push(productoNuevo);

            fs.writeFileSync(productsFilePath, JSON.stringify(productos,null,' '));
            res.redirect("/products/all-ok");    
        
        },
        publicacionExitosa: (req, res) => {
            res.render("sucess");
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