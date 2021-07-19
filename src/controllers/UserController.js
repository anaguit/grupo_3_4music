const controladorUsers = {
        login: (req, res) => {
            res.render("login")
        },

        perfil: (req, res) => {
            res.render("perfil")
        },

        registro: (req, res) => {
            res.render("register")
        }

}

module.exports = controladorUsers;