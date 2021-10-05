let precioProducto = document.getElementById("precioInstrumento");
let tituloProducto = document.getElementById("tituloProducto");
let fotoProducto = document.getElementById("featured");
let idProducto = document.getElementById("identificadorProducto");

let botonCarrito = document.getElementById("agregarCarrito");


//sessionStorage.clear();

let arrayProducts = [];
let productoAgregar;

botonCarrito.addEventListener("click", function(){


let x =  JSON.parse(sessionStorage.getItem("carritoProductos"));

if (x!=undefined){

    arrayProducts =  x;
   
   }
    productoAgregar = {
        id: idProducto.innerHTML,
        titulo: tituloProducto.innerHTML,
        precio: precioProducto.innerHTML,
        foto: fotoProducto.src
    };

   arrayProducts.push(productoAgregar);
   //'/images/products/guitarra.jpg'
    sessionStorage.setItem("carritoProductos", JSON.stringify(arrayProducts));

    window.location.replace("/cart");
   
})



