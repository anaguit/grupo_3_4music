let tituloProductoCarrito = document.getElementById("tituloProductoCarrito");
let precioProductoCarrito = document.getElementById("precioProductoCarrito");
let filaCarrito = document.getElementById("filaCarrito");
let subTotal = document.getElementById("subTotal");



let carritoProductos =  JSON.parse(sessionStorage.getItem("carritoProductos"));
let elementosHTML ="";
let sumatoria = 0;



if(carritoProductos.length > 0){

    for(let i=0; i<carritoProductos.length; i++){

        elementosHTML += "<div class='contenedor-producto'><div id='imagen' class='columnaGrande oculto394'> <img src=" + carritoProductos[i].foto + " alt='A' class='fotoProductoCarrito'> </div><div class='columnaGrande'><a href='/products/detail/" + carritoProductos[i].id + "'><p id='tituloProductoCarrito' class='texto'>" + carritoProductos[i].titulo + "</p></a></div><div class='columna'><p id='precioProductoCarrito'>" + carritoProductos[i].precio + "</p></div><div class='columna'><i><select class='selectorCantidad'><option value=''>1</option><option value=''>2</option><option value=''>3</option><option value=''>4</option><option value=''>5</option></select></i></div><div class='columna'><p class='total'>" + carritoProductos[i].precio + "</p></div></div>"        
        sumatoria += parseInt(carritoProductos[i].precio);
    }
        
        filaCarrito.innerHTML=elementosHTML;
        subTotal.innerHTML = "$" + sumatoria;
        //tituloProductoCarrito.innerHTML = carritoProductos[i].titulo;
        //precioProductoCarrito.innerHTML = carritoProductos[i].precio;

    
}
