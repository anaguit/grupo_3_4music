window.addEventListener("load", function () {
    let formulario = document.querySelector("#registrar");
    let nombre = document.querySelector("#nombre");
    let apellido = this.document.querySelector("#apellido");
    let email = document.querySelector("#email");
    let contraseña = document.querySelector("#contraseña");
    let telefono = document.querySelector("#telefono");
    let avatar = document.querySelector("#avatar");
    let tipoUsuario = document.querySelector("#tipoUsuario");
    let boton = document.querySelector(".boton-registro");

    

    let error = document.querySelector("#errorNombre");
    error.style.color = "crimson";

    formulario.addEventListener("submit", function(e) {
        e.preventDefault()

        let errorName = [];
        let key = false;

        if(nombre.value === "" || nombre.value === null) {
            errorName.push("Ingrese un nombre")
            key = true
        }

        else if(nombre.value.length < 3) {
            errorName.push("Ingrese un nombre con más de 3 caracteres")
            key = true
        }

        if(key == true) {
            error.innerHTML = errorName.join(" ")
        }


        if(apellido.value === "" || apellido.value === null) {
            errorApellido.push("Ingrese un apellido")
            key = true
        }

        else if(apellido.value.length < 3) {
            errorName.push("Ingrese un nombre con más de 3 caracteres")
            key = true
        }


        if(key == true) {
            errorApellidoP.innerHTML = errorApellido.join(" ")
        }

    })
})

