function authMiddleware (req, res, next) {
    if(!req.session.usuarioLogueado){
        return res.redirect("/users"); //si no está Logueado, lo redirijo a la Vista de Inicio de Sesion
    }
    next();
}

module.exports = authMiddleware;