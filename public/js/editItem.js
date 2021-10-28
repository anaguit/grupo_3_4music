window.addEventListener("load", function(){

    let formulario = document.querySelector(".formulario-NewItem");
    let titulo = document.getElementById("titulo");
    let marca = document.getElementById("marca");
    let modelo = document.getElementById("modelo");
    let precio = document.getElementById("precio");
    let categoria = document.getElementById("categoria");
    let descripcion = document.getElementById("descripcion");
    let foto = document.getElementById("imagenes");



    let errorTituloP = document.getElementById("tituloErrorP");
    let errorMarcaP = document.getElementById("marcaErrorP");
    let errorModeloP = document.getElementById("errorModeloP");
    let errorPrecioP = document.getElementById("errorPrecioP");
    let errorCategoriaP = document.getElementById("errorCategoriaP");
    let errorDescripcionP = document.getElementById("errorDescripcionP");
    let errorImagenP = document.getElementById("errorFotoP");



    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        let errorTitulo = [];
        let errorMarca = [];
        let errorModelo = [];
        let errorPrecio = [];
        let errorCategoria = [];
        let errorDescripcion = [];
        let errorImagen = [];

        let key = false;


        if (titulo.value === "" || titulo.value === null){
            errorTitulo.push("Ingrese un titulo");
            key = true;
        }

        else if (titulo.value.length < 3 && titulo.value.length >= 25){
            errorTitulo.push("Ingrese un titulo de no mas de 25 de caracteres");
            key = true;
        }


        if (marca.value === "" || marca.value === null){
            errorMarca.push("Ingrese una marca");
            key = true;
        }


        if (modelo.value === "" || modelo.value === null){
            errorModelo.push("Ingrese un modelo");
            key = true;
        }

        if (precio.value === "" || precio.value === null){
            errorPrecio.push("Ingrese un precio");
            key = true;
        }

        if (categoria.value === "" || categoria.value === null){
            errorCategoria.push("Ingrese una categoria");
            key = true;
        }

        if (descripcion.value === "" || descripcion.value === null){
            errorDescripcion.push("Ingrese una descripcion");
            key = true;
        }

        /*
        if (foto.value === "" || foto.value === null || foto.value === undefined){
            errorImagen.push("Ingrese una imagen");
            key = true;
        }*/


        if(key){
            errorTituloP.innerHTML = errorTitulo.join(" ");
            errorMarcaP.innerHTML = errorMarca.join(" ");
            errorModeloP.innerHTML = errorModelo.join(" ");
            errorPrecioP.innerHTML = errorPrecio.join(" ");
            errorCategoriaP.innerHTML = errorCategoria.join(" ");
            errorDescripcionP.innerHTML = errorDescripcion.join(" ");
            errorImagenP.innerHTML = errorImagen.join(" ");

        }

        else {
            formulario.submit()
        }


    })
})