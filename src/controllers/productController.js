/* Requires */
const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");

/* Conexion con el Modelo - BD */
const db = require ("../../database/models");
const { sequelize, Sequelize } = require('../../database/models');
const { Session } = require('inspector');
const Producto = require('../../database/models/Producto');
const { Console } = require('console');
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
                .cath( (e) => {
                    console.log(e);
                    });
        },

        listadoProductosUsuario: (req, res) =>{
           
            let idUsuario = req.params.idUser;
            
            db.Producto.findAll({include: 
                [{association:'categoria'},
                {association: 'fotos'},
                {association: 'producto_genero'}],

                where: {
                    id_usuario_FK : idUsuario
                }                     
                })
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
            
                let id_vendedor = req.session.usuarioLogueado.id;

                let productoNuevo = {
                    titulo: req.body.titulo ,    
                    marca: req.body.marca ,
                    modelo: req.body.modelo ,
                    id_usuario_FK : id_vendedor,
                    precio: req.body.precio,
                    id_categoria: req.body.categoria,
                    descripcion: req.body.descripcion,
                    cantidad_disponible : req.body.stock
                };

                let productoInsertado = await db.Producto.create(productoNuevo);

                //---------v Imágenes v---------

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

            //----------v Géneros Musicales v-----------
                
            let generos = req.body.generoMusical;
            let arrayGeneros = [];
            let objetoProductoGenero
                
            
            for(let i=0; i < generos.length; i++){
                objetoProductoGenero = {
                    id_producto: productoInsertado.id,
                    id_genero_musical: generos[i]
                };
                arrayGeneros.push(objetoProductoGenero); //agrego el Objeto que contiene el ID PRODUCTO y la URL de la foto al Array de Objetos Foto
            }
            db.Producto_Genero.bulkCreate(arrayGeneros); // mando el Array de Objetos Foto a la BD

            /*
            productoGenero = {
                    id_producto: productoInsertado.id,
                    id_genero_musical: req.body.generoMusical      
                };

               db.Producto_Genero.create(productoGenero);
            */
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
                if(producto.id_usuario_FK == req.session.usuarioLogueado.id) // Debe coincidir el usuario logueado con el que creó el aviso del producto para poder editarlo
                {
                    res.render("edit-item", {producto: producto, categoria: categoria})
                }
                else
                {
                    res.redirect("/users/profile"); 
                }
            })
        },

        almacenarProductoEditado: async (req, res) => {

            let errors = validationResult(req);
          
            if(errors.isEmpty()){


                let idURL = req.params.idProducto;
                
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
                
                if(req.files){
                    
                    let imagenes = req.files; // Obtengo las fotos
                    let arrayFotos = [];
                    let objetoFoto;

                    for(let i=0; i < imagenes.length; i++){
                        objetoFoto = {
                            id_producto: idURL,
                            url: imagenes[i].filename
                        };
                        arrayFotos.push(objetoFoto); //agrego el Objeto que contiene el ID PRODUCTO y la URL de la foto al Array de Objetos Foto
                    }
                    if(arrayFotos.length >= 1){
                        await db.Foto.destroy({
                            where: { id_producto: idURL} //elimino todas las fotos que tenia guardadas
                        }); 
                        
                        db.Foto.bulkCreate(arrayFotos); // mando el Array con las nuevas fotos
                    }
                   
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
            let productoEncontrado= await db.Producto.findByPk(idURL);
               
                  
            
            if(productoEncontrado.id_usuario_FK == req.session.usuarioLogueado.id)
                   {
                        
                        await db.Foto.destroy({
                            where: { id_producto: idURL} 
                        }); 
            
                        await db.Producto_Genero.destroy({
                            where: { id_producto: idURL} 
                        }); 
            
                        await db.Producto.destroy({
                            where: { id: idURL} 
                        }); 
                        
            
                   }
                   res.redirect("/")
                   
        },

        resultadoBusqueda: (req, res) => {
            
            let { busqueda } = req.query;
            let palabrasABuscar = busqueda.split(" "); //Obtengo un array con cada palabra a buscar
           
            let productosEncontrados = [];
           
            if(palabrasABuscar.length > 1){

                db.Producto.findAll({include: 
                    [{association:'categoria'},
                    {association: 'fotos'},
                    {association: 'producto_genero'}],
    
                    where: {
                        [op.or]: {
                            titulo: {
                                [op.like]: `%${palabrasABuscar[0]}%`
                            },
                            [op.or]: [
                                {
                                    marca: {
                                        [op.like]: `%${palabrasABuscar[0]}%`
                                    }
                                },
                                {
                                    marca: {
                                        [op.like]: `%${palabrasABuscar[1]}%`
                                    }
                                },
                                
                            ],
                            [op.or]: [
                                {
                                    modelo: {
                                        [op.like]: `%${palabrasABuscar[0]}%`
                                    }
                                },
                                {
                                    modelo: {
                                        [op.like]: `%${palabrasABuscar[1]}%`
                                    }
                                },
                                {
                                    modelo: {
                                        [op.like]: `%${palabrasABuscar[2]}%`
                                    }
                                },
                                
                            ]  
                        }
                    }
                })
                .then(function(resultados){
                    productosEncontrados = resultados;
                    res.render("results-search", {productos: productosEncontrados, busqueda: busqueda, genero: null}); //Busqueda Basica.
                })    
            }else{
                db.Producto.findAll({include: 
                    [{association:'categoria'},
                    {association: 'fotos'},
                    {association: 'producto_genero'}],
    
                    where: {
                        [op.or]: {
                            titulo: {
                                [op.like]: `%${busqueda}%`
                            },
                            marca: {
                                [op.like]: `%${busqueda}%`
                            },
                            modelo: {
                                [op.like]: `%${busqueda}%`
                            }
                        }
                    }
                })
                .then(function(resultados){
                    productosEncontrados = resultados;
                    res.render("results-search", {productos: productosEncontrados, busqueda: busqueda, genero:null}); //Busqueda Basica.
                })    
            }
        },
        busquedaPorGenero: (req, res) => { //Busqueda por Estilo Musical

            let generoABuscar = req.query.genero;
            let productosEncontrados = [];
            
            db.Producto.findAll({include: 
                [{association:'categoria'},
                {association: 'fotos'},
                {association: 'producto_genero'}
            ],  where:{
                '$producto_genero.id_genero_musical$': {
                    [op.like]: generoABuscar
                }
            }
        }) 
  
            .then(function(resultados){
                productosEncontrados = resultados;
                
                res.render("results-search", {productos: productosEncontrados, busqueda: null, genero: generoABuscar});
        
            })    
               
        },
        busquedaPorCategoria: (req, res) => { //Busqueda por Estilo Musical

            let catABuscar = req.query.categoria;
            let productosEncontrados = [];
            
            db.Producto.findAll({include: 
                [{association:'categoria'},
                {association: 'fotos'},
                {association: 'producto_genero'}
            ],  where:{
                id_categoria: {
                    [op.like]: catABuscar
                }
            }
        }) 
  
            .then(function(resultados){
                productosEncontrados = resultados;
                
                res.render("results-search", {productos: productosEncontrados, busqueda: catABuscar, genero: null});
        
            })    
               
        },
        productos: (req, res) => {
            let productosPorCategoria = [];
            let objetoProductoCategoria;

            db.Producto.findAll({ attributes: ['id_categoria', 
                [sequelize.fn('COUNT', sequelize.col('titulo')), 'cantidadPorCategoria'] 
                ],
                group: 'id_categoria', include: [{association:'categoria'}]})
            .then(productos => {
                
                for(let i=0; i<productos.length; i++){
                     objetoProductoCategoria = {
                        id_categoria:productos[i].id_categoria,
                        nombre_categoria:productos[i].categoria.nombre,
                        cantidad: productos[i].dataValues.cantidadPorCategoria
                    };
                    productosPorCategoria.push(objetoProductoCategoria);
                }
                
                db.Producto.findAll({ order: [
                    ['id', 'DESC']
                    ],
                    include: [{association:'categoria'},{association: 'fotos'},{association: 'producto_genero'}]})
                    .then(productos => {

                        return res.json( {
                            count: productos.length,
                            countByCategory: productosPorCategoria,
                            products: productos })
                    })
            });  

            
        },
        categorias: (req, res) => {
            db.Categoria.findAll()
                .then(categorias => {

                    return res.json( {
                        count: categorias.length
                        })
                })
        },
        producto: (req,res) =>{
            db.Producto.findByPk(req.params.id, {include: [{association:'categoria'},{association: 'fotos'},{association: 'producto_genero'}]})
                .then(productos => {

                    return res.json( {
                        total: productos.length,
                        datos: productos })
                })
        }

}

module.exports = controladorProducto;