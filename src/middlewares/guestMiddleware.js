function guestMiddleware (req, res, next) {
    if(req.session.usuarioLogueado){
        return res.redirect("/users/profile"); //si está en Session, lo redirijo a la Vista de Perfil
    }
    next();
}

module.exports = guestMiddleware;