/* Requires */
const fs = require('fs');
const path = require('path');

/* Lectura de Productos del Json */
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

/* Conexion con el Modelo - BD */
const db = require ("../../database/models");
const { sequelize, Sequelize } = require('../../database/models');
//const { where } = require('sequelize/types');
const op = Sequelize.Op;

let productos;

const controlador = {
    index: (req, res) =>{ 
        //let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        db.Producto.findAll({include: [{association:'categoria'},{association: 'fotos'},{association: 'producto_genero'}]})
        .then(function(resultados){
            productos = resultados;
            res.render("index", {productos: productos});
        })

        
    }

}

module.exports = controlador;