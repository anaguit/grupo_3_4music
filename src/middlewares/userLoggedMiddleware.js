const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false; // variable conocida en toda la Aplicacion

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie;

    for (let i of usuarios){
        if (emailInCookie == i.email) {
            userFromCookie = i;
        }
    }

    if (userFromCookie) {
        req.session.usuarioLogueado = userFromCookie;
    }

    if(req.session && req.session.usuarioLogueado){
        res.locals.isLogged = true; //Si está Logueado, mostraré cierto contenido
        res.locals.usuarioLogueado = req.session.usuarioLogueado; // paso lo que tengo en Session a una Variable Local
    }
    next();
}

module.exports = userLoggedMiddleware;