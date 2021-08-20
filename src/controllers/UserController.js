/* Requires */
const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs")
/* Lectura de Usuarios del Json */
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controladorUsers = {
        login: (req, res) => {
            res.render("login")
        },

        perfil: (req, res) => {
            res.render("perfil")
        },

        registro: (req, res) => {
            res.render("register")
        },
        crearNuevoUsuario: (req, res) => {
            let errors = validationResult(req)
            
            
            
            if(errors.isEmpty()){ 
            
            idNuevo=0;

            for (let i of usuarios){
                if (idNuevo<i.id){
                    idNuevo=i.id;
                }
            }

            idNuevo++;

            let nombreImagen = req.file.filename;
            let compradorSitio = false; // por  defecto es vendedor
            //let passEncriptada = bcryptjs.hashSync(req.body.password, 10);

            if(req.body.tipoUsuario == 1){
                compradorSitio = true; // si el valor es 1, se lo registra como comprador
            }

            let usuarioNuevo =  {
                id:   idNuevo,
                nombre: req.body.nombre ,    
                apellido: req.body.apellido ,
                email: req.body.email ,
                password: req.body.password,
                telefono: req.body.telefono,
                fotoPerfil: nombreImagen,
                comprador: compradorSitio
            };

            usuarios.push(usuarioNuevo);

            fs.writeFileSync(usersFilePath, JSON.stringify(usuarios,null,' '));

            res.redirect("/users/registracionOK"); 
        } 
            else {
                if (errors.errors.length > 0){
            res.render("register", 
                {errors: errors.mapped(),
                old: req.body
        });
        };
    }
        },
        registracionExitosa: (req, res) => {
            res.render("registracionExitosa");
        }
        
}

module.exports = controladorUsers;