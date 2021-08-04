/* Requires */
const fs = require('fs');
const path = require('path');

/* Lectura de Productos del Json */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const controlador = {
    index: (req, res) =>{ 
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render("index", {productos: products});
    }
    /*,

    login: (req, res) => {
        res.render ("login")
    },

    registro: (req, res) =>{
        res.render ("register")
    },

    detalleItems: (req, res) =>{
        res.render ("item-detail")
    },

    carrito: (req, res) => {
        res.render("cart")
    }*/

}

module.exports = controlador;