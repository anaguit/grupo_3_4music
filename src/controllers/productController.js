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

            let idURL = req.params.id;
            let productoEncontrado;

            for(let p of productos){
                if (idURL == p.id){
                    productoEncontrado = p;
                }
            }

            res.render("edit-item", {productoaEditar: productoEncontrado});
        },

        almacenarProductoEditado: (req, res) => {

            let idURL = req.params.id;
            let productoEncontrado;

            for (let p of productos){
                if(idURL == p.id){
                    p.titulo = req.body.titulo;
                    p.marca = req.body.marca;
                    p.modelo = req.body.modelo;
                    p.precio = req.body.precio;
                    p.categoria = req.body.categoria;
                    p.descripcion = req.body.descripcion;
                    p.dimensiones = req.body.dimensiones;
                    p.materiales = req.body.materiales;
                    break;
                }
            }

            fs.writeFileSync(productsFilePath, JSON.stringify(productos,null," "))

            res.redirect("/products"); //Provisorio. Luego debe almacenar en Json el producto editado (Actualizar BD) El anterior era "products/new-item"

        },
        
        eliminarProducto: (req, res) => {

            let idURL = req.params.id;

            let Nproductos = productos.filter(function(e){
                return idURL != e.id;
            })

            fs.writeFileSync(productsFilePath, JSON.stringify(Nproductos,null," "));

            res.redirect("/"); //Provisorio. Luego debe borrar de la BD (Json) el producto recibido por ID. El anterior era "products/all-items"
        }
}

module.exports = controladorProducto;