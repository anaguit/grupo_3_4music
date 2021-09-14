
const db = require ("../../database/models");
const { sequelize, Sequelize } = require('../../database/models');
//const { where } = require('sequelize/types');
const op = Sequelize.Op;

function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false; // variable conocida en toda la Aplicacion

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie;
    
    db.Usuario.findOne({
        where:{
            email: {
                [op.like]: emailInCookie
            }       
        }
    })
        .then(function(usuario){
            userFromCookie=usuario;
                
            if (userFromCookie) {
                req.session.usuarioLogueado = userFromCookie;
            }

            if(req.session && req.session.usuarioLogueado){
                res.locals.isLogged = true; //Si está Logueado, mostraré cierto contenido
                res.locals.usuarioLogueado = req.session.usuarioLogueado; // paso lo que tengo en Session a una Variable Local
            }
            next();
    })
}

module.exports = userLoggedMiddleware;