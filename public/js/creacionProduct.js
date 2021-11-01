window.addEventListener("load", function() {

    let formulario = document.querySelector(".formulario-NewItem");
    let titulo = document.getElementById("titulo");
    let marca = document.getElementById("marca");
    let modelo = document.getElementById("modelo");
    let precio = document.getElementById("precio");
    let categoria = document.getElementById("categoria");
    let descripcion = document.getElementById("descripcion");
    let imagen = document.getElementById("imagenes");
    let generoMusical = document.getElementById("generoMusical");
    let stock = document.getElementById("stock");


    let errorTituloP = document.getElementById("errorTitulo");
    let errorMarcaP = document.getElementById("errorMarca");
    let errorModeloP = document.getElementById("errorModelo");
    let errorPrecioP = document.getElementById("errorPrecio");
    let errorDescripcionP = document.getElementById("errorDescripcion");
    let errorCategoriaP = document.getElementById("errorCategoria");
    let errorImagenP = document.getElementById("errorImagenes");
    let errorGeneroMusicalP = document.getElementById("errorGeneroMusical");
    let errorStockP = document.getElementById("errorStock");


    formulario.addEventListener("submit", function(e) {
        e.preventDefault();

        let errorTitulo = [];
        let errorMarca = [];
        let errorModelo = [];
        let errorPrecio = [];
        let errorDescripcion = [];
        let errorCategoria = [];
        let errorImagen = [];
        let errorGeneroMusical = [];
        let errorStock = [];
        let key = false;

        if(titulo.value === "" || titulo.value === null) {
            errorTitulo.push("Ingrese un titulo")
            key = true;
        }
        else if (titulo.value.length < 3 || titulo.value.length > 25) {
            errorTitulo.push("Ingrese un titulo de hasta 25 carácteres")
            key = true;
        }
        

        if(marca.value === "" || marca.value === null) {
            errorMarca.push("Ingrese una marca")
            key = true;
        }
        else if (marca.value.length < 3 && marca.value.length > 25) {
            errorMarca.push("Ingrese una marca de hasta 25 carácteres")
            key = true;
        }


        if(modelo.value === "" || modelo.value === null) {
            errorModelo.push("Ingrese un modelo")
            key = true;
        }
        else if (modelo.value.length <= 1 && modelo.value.length > 25) {
            errorModelo.push("Ingrese un modelo de hasta 25 carácteres")
            key = true;
        }



        if(precio.value === "" || precio.value === null) {
            errorPrecio.push("Ingrese un precio")
            key = true;
        }
        


        if(descripcion.value === "" || descripcion.value === null) {
            errorDescripcion.push("Ingrese una descripción")
            key = true;
        }
        else if (descripcion.value.length < 3 && descripcion.value.length >= 150) {
            errorDescripcion.push("Ingrese una descripcion de hasta 150 carácteres")
            key = true;
        }



        if(categoria.value === "" || categoria.value === null) {
            errorCategoria.push("Seleccione una categoria")
            key = true;
        }
        


        if (imagen.value === undefined  || imagen.value === null || imagen.value === ""){
            errorImagen.push("Ingresa una imagen")
            key = true;
        }

        else if(imagen.files.length > 4){
            errorImagen.push("Puedes ingresar hasta 4 imagenes");
            key = true;
        }


        if(generoMusical.value === "" || generoMusical.value === null) {
            errorGeneroMusical.push("Seleccione un género musical")
            key = true;
        }
        

        if(stock.value === "" || stock.value === null) {
            errorStock.push("Ingrese una cantidad disponible")
            key = true;
        }
        
        
        if(key){
            errorTituloP.innerHTML = errorTitulo.join(" ");
            errorMarcaP.innerHTML = errorMarca.join(" ");
            errorModeloP.innerHTML = errorModelo.join(" ");
            errorPrecioP.innerHTML = errorPrecio.join(" ");
            errorCategoriaP.innerHTML = errorCategoria.join(" ");
            errorDescripcionP.innerHTML = errorDescripcion.join(" ");
            errorImagenP.innerHTML = errorImagen.join(" ");
            errorGeneroMusicalP.innerHTML = errorGeneroMusical.join(" ");
            errorStockP.innerHTML = errorStock.join(" ");

            console.log("ERRORRRRR");
        }

        else {
            console.log("ENVIARRR");
            formulario.submit()
        }

    })


})