function authMiddleware (req, res, next) {
    if(!req.session.usuarioLogueado){
        return res.redirect("/users"); //si no está Logueado, lo redirijo a la Vista de Inicio de Sesion
    }
    else{
        if(req.params.id && req.params.id != req.session.usuarioLogueado.id){
            return res.redirect("/users/profile"); 
            // si no coincide el ID recibido en la URL con el ID del Usuario Logueado, lo redirecciono al Perfil del User Logueado
        }
    }
    next();
}

module.exports = authMiddleware;