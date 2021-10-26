window.addEventListener("load", function(){

    let formulario = document.querySelector(".formularioRegistro");
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let email = document.getElementById("email");
    let contraseña = document.getElementById("contraseña");
    let telefono = document.getElementById("telefono");
    let foto = document.getElementById("avatar");
    let tipoUsuario = document.getElementById("tipoUsuario");



    let errorNombre = document.getElementById("errorNombreP");
    errorNombre.style.color = "crimson";

    let errorApellido = document.getElementById("errorApellidoP");
    errorApellido.style.color = "crimson";

    let errorEmail = document.getElementById("errorEmailP");
    errorEmail.style.color = "crimson";

    let errorContraseña = document.getElementById("errorContraseñaP");
    errorContraseña.style.color = "crimson";

    let errorTelefono = document.getElementById("errorTelefonoP");
    errorTelefono.style.color = "crimson";

    let errorFoto = document.getElementById("errorFotoP");
    errorFoto.style.color = "crimson";

    let errorTipoUsuario = document.getElementById("errorTipoUsuarioP");
    errorTipoUsuario.style.color = "crimson";





    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        let errorName = [];
        let errorLastName = [];
        let errorMail = [];
        let errorPass = [];
        let errorPhone = [];
        let errorPhoto = [];
        let errorTypeUser = [];

        let regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        let regexPhone = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/;

        let key = false;


        if (nombre.value === null || nombre.value === ""){
            errorName.push("Ingresa un nombre")
            key = true;
        }

        else if (nombre.value.length < 3){
            errorName.push("Ingrese un nombre mas largo")
            key = true;
        }

        if (apellido.value === null || apellido.value === ""){
            errorLastName.push("Ingrese un apellido")
            key = true;
        }

        else if (apellido.value.length < 3){
            errorLastName.push("Ingrese un apellido mas largo")
            key = true;
        }

        if (!regexEmail.test(email.value)){
            errorMail.push("Ingrese un email valida")
            key = true;
        }

        if (contraseña.value === null || contraseña.value === "") {
            errorPass.push("Ingrese una contraseña valido")
            key = true;
        }

        if (!regexPhone.test(telefono.value)){
            errorPhone.push("Ingrese un telefono valido")
            key = true;
        }

        if (foto.value === undefined  || foto.value === null || foto.value === ""){
            errorPhoto.push("Ingresa una imagen")
            key = true;
        }

        if (tipoUsuario.value === null || tipoUsuario.value === ""){
            errorTypeUser.push("Elige el tipo de usuario")
            key = true;
        }




        if(key){
            errorNombre.innerHTML = errorName.join(" ");
            errorApellido.innerHTML = errorLastName.join(" ");
            errorEmail.innerHTML = errorMail.join(" ");
            errorContraseña.innerHTML = errorPass.join(" ");
            errorTelefono.innerHTML = errorPhone.join(" ");
            errorFoto.innerHTML = errorPhoto.join(" ");
            errorTipoUsuario.innerHTML = errorTypeUser.join(" ");

        }

        else {
            formulario.submit()
        }
    })


})