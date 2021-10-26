window.addEventListener("load", function(){
    let formulario = document.querySelector(".formularioRegistro");
    let email = document.getElementById("email");
    let contraseña = document.getElementById("contraseña");

    let errorEmailP = document.getElementById("errorEmail");
    let errorContraseñaP = document.getElementById("errorContraseña");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();
    
        let errorEmail = [];
        let errorContraseña = [];
        let regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        let key = false;

        if (!regexEmail.test(email.value)){
            errorEmail.push("Ingrese un email valido")
            key = true;
        }

        if (contraseña.value === null || contraseña.value === ""){
            errorContraseña.push("Ingresa una contraseña");
            key = true;
        }

        if(key){
            errorEmailP.innerHTML = errorEmail.join(" ");
            errorContraseñaP.innerHTML = errorContraseña.join(" ");
        }

        else{
            formulario.submit();
        };

    })
})