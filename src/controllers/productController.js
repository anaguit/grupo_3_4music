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
                imagen: nombreImagen,
                generoMusical : req.body.generoMusical
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

            let nombreImagen = req.file.filename;

            for (let p of productos){
                if(idURL == p.id){
                    p.titulo = req.body.titulo;
                    p.marca = req.body.marca;
                    p.modelo = req.body.modelo;
                    p.precio = req.body.precio;
                    p.categoria = req.body.categoria;
                    p.descripcion = req.body.descripcion;
                    p.imagen= nombreImagen;
                    break;
                }
            }

            fs.writeFileSync(productsFilePath, JSON.stringify(productos,null," "))

            res.redirect("/products"); 

        },
        
        eliminarProducto: (req, res) => {

            let idURL = req.params.id;

            let Nproductos = productos.filter(function(e){
                return idURL != e.id;
            })

            fs.writeFileSync(productsFilePath, JSON.stringify(Nproductos,null," "));

            res.redirect("/"); 
        },

        resultadoBusqueda: (req, res) => {
            productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            
            let aBuscar = req.query.busqueda;
            let productosEncontrados = [];
            
            productosEncontrados = productos.filter(function(p) {
                return (p.titulo.includes(aBuscar) || 
                p.marca.includes(aBuscar) || 
                p.modelo.includes(aBuscar) || 
                p.generoMusical==aBuscar || 
                p.categoria == aBuscar ||
                ((p.titulo + ' ' + p.marca) == aBuscar) || 
                ((p.titulo + ' ' + p.marca + ' ' + p.modelo) == aBuscar) ||
                ((p.marca + ' ' + p.modelo) == aBuscar)
                );
            });
            
            
            res.render("results-search", {productos: productosEncontrados, busqueda: aBuscar}); //Busqueda Basica.
        },
        busquedaPorCategoria: (req, res) => {
            productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            
            let catABuscar = req.query.categoria;
            let productosEncontrados = [];
            
            productosEncontrados = productos.filter(function(p) {
                return (p.categoria == catABuscar );
            });
            
            
            res.render("results-search", {productos: productosEncontrados, busqueda: catABuscar}); //Busqueda Basica.
        }

}

module.exports = controladorProducto;