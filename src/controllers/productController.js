/* Requires */
const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");

/* Conexion con el Modelo - BD */
const db = require ("../../database/models");
const { sequelize, Sequelize } = require('../../database/models');
//const { where } = require('sequelize/types');
const op = Sequelize.Op;

let productos;

const controladorProducto = {
        listadoProductos: (req, res) =>{
           
            
            db.Producto.findAll({include: [{association:'categoria'},{association: 'fotos'},{association: 'producto_genero'}]})
                .then(function(resultados){
                    productos = resultados;
                    res.render("all-items", {productos: productos});
                })
        },

        detalleProducto: (req, res) => {   
            let idURL = req.params.idProducto;
            let productoEncontrado;

            db.Producto.findByPk(idURL, {
                include: [{association:'categoria'},{association: 'fotos'},{association: 'producto_genero'}]})
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
                .catch(function(error){
                    console.log(error)
                })
        },

        almacenarNuevoProducto: async (req, res) => {
            
            let errors = validationResult(req);
          
            if(errors.isEmpty()){

            //let nombreImagen = req.file.filename;
           
            

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
              
            /*
            let fotoNueva = {
                id_producto: productoInsertado.id,
                url: nombreImagen      
            };
            db.Foto.create(fotoNueva);
            */

            let imagenes = req.files; // Obtengo las fotos
            let arrayFotos = [];
            let objetoFoto;

            for(let i=0; i < imagenes.length; i++){
                objetoFoto = {
                    id_producto: productoInsertado.id,
                    url: imagenes[i].filename
                };
                arrayFotos.push(objetoFoto); //agrego el Objeto que contiene el ID PRODUCTO y la URL de la foto al Array de Objetos Foto
           }

           db.Foto.bulkCreate(arrayFotos); // mando el Array de Objetos Foto a la BD
            
            let productoGenero = {
                id_producto: productoInsertado.id,
                id_genero_musical: req.body.generoMusical      
            };

            db.Producto_Genero.create(productoGenero);
            
            res.redirect("/products/all-ok");
        }
        else {
                if (errors.errors.length > 0){
                    let pedidoCategoria = db.Categoria.findAll()
                    let pedidoGenero = db.Genero_Musical.findAll()

                    Promise.all([pedidoCategoria, pedidoGenero])
                        .then(function([categoria, genero]){
                            res.render("new-item",
                        {errors: errors.mapped(),
                        old: req.body,
                        categoria: categoria,
                        genero: genero
                        }); })
                
            };
        };
    },
        publicacionExitosa: (req, res) => {
            res.render("sucess");
        },
        editarProducto: (req, res) => {
            
        let pedidoProducto = db.Producto.findByPk(req.params.idProducto,
            {include: [{association: 'fotos'}]  } );
        let pedidoCategoria = db.Categoria.findAll();
        
        
        Promise.all([pedidoProducto, pedidoCategoria])
            .then(function([producto, categoria]){
                res.render("edit-item", {producto: producto, categoria: categoria})
            })
        },

        almacenarProductoEditado: async (req, res) => {

            let errors = validationResult(req);
          
            if(errors.isEmpty()){


                let idURL = req.params.idProducto;
                
                let nombreImagen;

                let idProducto = await db.Producto.update({
                    titulo:req.body.titulo,
                    marca:req.body.marca,
                    modelo:req.body.modelo,
                    precio:req.body.precio,
                    id_categoria:req.body.selectegoria,
                    descripcion:req.body.descripcion
                },{
                    where: {
                        id: idURL
                    }
                });
                
                if(req.file){
                    nombreImagen = req.file.filename; // Si se cargó una nueva foto, guardo el nombre en esta variable
                    console.log(nombreImagen);

                    let fotoEditada = {
                        id_producto: idProducto.id,
                        url: nombreImagen      
                    };
                    
                    db.Foto.update(fotoEditada, {
                    where: {
                        id_producto: idURL
                    }
                    });
                }
                
                res.redirect("/products"); 
            }
            else {
                    if (errors.errors.length > 0){

                        let pedidoProducto = db.Producto.findByPk(req.params.idProducto);
                        let pedidoCategoria = db.Categoria.findAll();
    
                        Promise.all([pedidoProducto, pedidoCategoria])
                            .then(function([producto, categoria]){
                                res.render("edit-item", {
                                    errors: errors.mapped(),
                                    old: req.body,
                                    producto: producto, 
                                    categoria: categoria
                            })
                        })
                    
                }
            }
        },
        
        eliminarProducto: async (req, res) => {

            let idURL = req.params.id;

            await db.Foto.destroy({
                where: { id_producto: idURL} 
            }); 

            await db.Producto_Genero.destroy({
                where: { id_producto: idURL} 
            }); 

            await db.Producto.destroy({
                where: { id: idURL} 
            }); 
            

             await db.Producto_Genero.destroy({
                where:{
                    id_producto:idURL
                }
            });

            res.redirect("/")
        },

        resultadoBusqueda: (req, res) => {
            
            let aBuscar = req.query.busqueda;
            let productosEncontrados = [];

            db.Producto.findAll({include: 
                [{association:'categoria'},
                {association: 'fotos'},
                {association: 'producto_genero'}
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
                {association: 'producto_genero'}
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