window.onload = function () { 
traerCarrito(); // Al Cargar la Ventana, traigo los productos del Carrito
}


// Defino variables globales
    let filaCarrito = document.getElementById("filaCarrito");
    let subTotal = document.getElementById("subTotal");
    let cantidad;
    let carritoProductos; 
    let elementosHTML;
    let sumatoria;



//Funcion encargada de Traer los Productos del Carrito desde SessionStorage
    function traerCarrito(){
        elementosHTML ="";
        sumatoria = 0;
        filaCarrito.innerHTML="";
        subTotal.innerHTML = "$" + sumatoria;

        carritoProductos =  JSON.parse(sessionStorage.getItem("carritoProductos"));
        
        if(carritoProductos.length > 0){

            for(let i=0; i<carritoProductos.length; i++){
                
                cantidad = carritoProductos[i].cantidad;
        
                elementosHTML += "<div class='contenedor-producto'><div id='imagen' class='columnaGrande oculto394'> <img src=" + carritoProductos[i].foto + " alt='A' class='fotoProductoCarrito'> </div><div class='columnaGrande'><a href='/products/detail/" + carritoProductos[i].id + "'><p id='tituloProductoCarrito' class='texto'>" + carritoProductos[i].titulo + "</p></a></div><div class='columna'><p id='precioProductoCarrito'>$" + carritoProductos[i].precio + "</p></div><div class='columna'><i><select id='cantidad' class='selectorCantidad'><option value='" + carritoProductos[i].cantidad + "' 'selected'>" + carritoProductos[i].cantidad + "</option></select></i></div><div class='columna'><p class='total'>$" + carritoProductos[i].precio * cantidad + "</p></div><div class='colummna'><i><button type = 'click' onclick='borrarItem("+ i +")'  id='tachito-"+ i + "' class='fas fa-trash'></button></i></a></div></div>"        
                
                sumatoria += parseInt((carritoProductos[i].precio) * cantidad);
        
                filaCarrito.innerHTML=elementosHTML;
        
                subTotal.innerHTML = "$" + sumatoria;
            }
        }

    }


//Funcion encargada de Eliminar un Item del Carrito
    function borrarItem(producto){
        
        carritoProductos.splice(producto,1);
        sessionStorage.removeItem("carritoProductos");
        sessionStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));
        traerCarrito();
    }

