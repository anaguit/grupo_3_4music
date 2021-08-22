function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false; // variable conocida en toda la Aplicacion
    if(req.session && req.session.usuarioLogueado){
        res.locals.isLogged = true; //Si está Logueado, mostraré cierto contenido
        res.locals.usuarioLogueado = req.session.usuarioLogueado; // paso lo que tengo en Session a una Variable Local
    }
    next();
}

module.exports = userLoggedMiddleware;