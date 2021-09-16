/* Requires */
const fs = require('fs');
const path = require('path');


/* Lectura de Productos del Json */
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* Conexion con el Modelo - BD */
const db = require ("../../database/models");
const { sequelize, Sequelize } = require('../../database/models');
//const { where } = require('sequelize/types');
const op = Sequelize.Op;

let productos;

const controladorProducto = {
        listadoProductos: (req, res) =>{
            //productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            
            db.Producto.findAll({include: [{association:'categoria'},{association: 'fotos'},{association: 'generos'}]})
                .then(function(resultados){
                    productos = resultados;
                    res.render("all-items", {productos: productos});
                })
        },

        detalleProducto: (req, res) => {   
            let idURL = req.params.id;
            let productoEncontrado;

            db.Producto.findByPk(idURL, {
                include: [{association:'categoria'},{association: 'fotos'},{association: 'generos'}]})
                .then(function(resultado){
                    productoEncontrado = resultado;
                    res.render("item-detail", {productoDetalle: productoEncontrado});
                })      
        },

        productoNuevo: (req, res) => {
            let pedidoCategoria = db.Categoria.findAll();
            let pedidoGenero = db.Genero_Musical.findAll();
            

            Promise.all([pedidoCategoria, pedidoGenero])
                .then(function([categoria, genero]){
                    res.render("new-item", {categoria: categoria, genero: genero})
                })
        },

        almacenarNuevoProducto: async (req, res) => {
            
            let nombreImagen = req.file.filename;
            

            let productoNuevo = {
                titulo: req.body.titulo ,    
                marca: req.body.marca ,
                modelo: req.body.modelo ,
                precio: req.body.precio,
                id_categoria: req.body.categoria,
                descripcion: req.body.descripcion,
                cantidad_disponible : req.body.stock
            };

            let productoInsertado = await db.Producto.create(productoNuevo);
               
            let fotoNueva = {
                id_producto: productoInsertado.id,
                url: nombreImagen      
            };
            db.Foto.create(fotoNueva);

            /*
            let productoGenero = {
                id_producto: productoInsertado.id,
                id_genero_musical: req.body.generoMusical      
            };

            db.producto_genero.create(productoGenero);
            */
            res.redirect("/products/all-ok");    
              
        },
        publicacionExitosa: (req, res) => {
            res.render("sucess");
        },
        editarProducto: (req, res) => {
            
        let pedidoProducto = db.Producto.findByPk(req.params.id);
        let pedidoCategoria = db.Categoria.findAll();

        Promise.all([pedidoProducto, pedidoCategoria])
            .then(function([producto, categoria]){
                res.render("edit-item", {producto: producto, categoria: categoria})
            })
        },

        almacenarProductoEditado: async (req, res) => {
            //let idURL = req.params.id;
            //let productoEncontrado;
            
            let nombreImagen = req.file.filename;
            let idProducto = await db.Producto.update({
                titulo:req.body.titulo,
                marca:req.body.marca,
                modelo:req.body.modelo,
                precio:req.body.precio,
                id_categoria:req.body.categoria,
                descripcion:req.body.descripcion
            });

            let fotoEditada = {
                id_producto: idProducto.id,
                url: nombreImagen      
            };
            db.Foto.update(fotoEditada)
            
            /*for (let p of productos){
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
            }*/
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
            //productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            
            let aBuscar = req.query.busqueda;
            let productosEncontrados = [];

            db.Producto.findAll({include: 
                [{association:'categoria'},
                {association: 'fotos'},
                {association: 'generos'}
            ],
        }) //VER COMO METER EL WHERE PARA HACER LA BUSQUEDA
                .then(function(resultados){
                    productosEncontrados = resultados;
                    res.render("results-search", {productos: productosEncontrados, busqueda: aBuscar}); //Busqueda Basica.
                })
            
                /*
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
            });*/
            
            
            
        },
        busquedaPorCategoria: (req, res) => {
            //productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            
            let catABuscar = req.query.categoria;
            let productosEncontrados = [];
            
            db.Producto.findAll({include: 
                [{association:'categoria'},
                {association: 'fotos'},
                {association: 'generos'}
            ],
        }) //VER COMO METER EL WHERE PARA HACER LA BUSQUEDA
            .then(function(resultados){
                productosEncontrados = resultados;
                res.render("results-search", {productos: productosEncontrados, busqueda: catABuscar}); //Busqueda Basica.
        
            })    
            /*
            productosEncontrados = productos.filter(function(p) {
                return (p.categoria == catABuscar );
            });
            */    
        }

}

module.exports = controladorProducto;