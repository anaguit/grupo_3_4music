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

}

module.exports = controlador;