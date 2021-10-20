let tituloProductoCarrito = document.getElementById("tituloProductoCarrito");
let precioProductoCarrito = document.getElementById("precioProductoCarrito");
let filaCarrito = document.getElementById("filaCarrito");
let subTotal = document.getElementById("subTotal");
let cantidad;




let carritoProductos =  JSON.parse(sessionStorage.getItem("carritoProductos"));
let elementosHTML ="";
let sumatoria = 0;
let carritoFinal;


if(carritoProductos.length > 0){

    for(let i=0; i<carritoProductos.length; i++){

        cantidad = carritoProductos[i].cantidad;

        elementosHTML += "<div class='contenedor-producto'><div id='imagen' class='columnaGrande oculto394'> <img src=" + carritoProductos[i].foto + " alt='A' class='fotoProductoCarrito'> </div><div class='columnaGrande'><a href='/products/detail/" + carritoProductos[i].id + "'><p id='tituloProductoCarrito' class='texto'>" + carritoProductos[i].titulo + "</p></a></div><div class='columna'><p id='precioProductoCarrito'>$" + carritoProductos[i].precio + "</p></div><div class='columna'><i><select id='cantidad' class='selectorCantidad'><option value='" + carritoProductos[i].cantidad + "' 'selected'>" + carritoProductos[i].cantidad + "</option></select></i></div><div class='columna'><p class='total'>$" + carritoProductos[i].precio * cantidad + "</p></div><div class='colummna'><i><button type = 'click'  id='tachito' class='fas fa-trash'></button></i></a></div></div>"        
        
       
        sumatoria += parseInt((carritoProductos[i].precio) * cantidad);

        if(carritoProductos[i].id==null){
            carritoProductos.filter(function(elemento){
                return elemento==null
            })
 
        }
        
        
   


        filaCarrito.innerHTML=elementosHTML;

        subTotal.innerHTML = "$" + sumatoria;
    }


        let botonTachito = document.querySelectorAll("#tachito");
        botonTachito.forEach(botones => {
            botones.addEventListener("click", function(event) {
                
               const botonClickeado = event.target;
               botonClickeado.closest(".contenedor-producto").remove();
               sessionStorage.removeItem("carritoProductos")
            })
        })
        




        /*
        botonTachito.addEventListener("click", function(e){
            alert("aaaa");
            e.preventDefault();
                for(let x=0; x<carritoProductos.length; x++){

                    if(x!=botonTachito.href){

                        cantidad = carritoProductos[x].cantidad;
                    
                        elementosHTML += "<div class='contenedor-producto'><div id='imagen' class='columnaGrande oculto394'> <img src=" + carritoProductos[x].foto + " alt='A' class='fotoProductoCarrito'> </div><div class='columnaGrande'><a href='/products/detail/" + carritoProductos[x].id + "'><p id='tituloProductoCarrito' class='texto'>" + carritoProductos[x].titulo + "</p></a></div><div class='columna'><p id='precioProductoCarrito'>$" + carritoProductos[x].precio + "</p></div><div class='columna'><i><select id='cantidad' class='selectorCantidad'><option value='" + carritoProductos[x].cantidad + "' 'selected'>" + carritoProductos[x].cantidad + "</option></select></i></div><div class='columna'><p class='total'>$" + carritoProductos[x].precio * cantidad + "</p></div><div class='colummna'><a href='"+ x + "' id='tachito'><i class='fas fa-trash' ></i></a></div></div>"        
                
                        sumatoria += parseInt((carritoProductos[x].precio) * cantidad);

                    }
                }
                    filaCarrito.innerHTML=elementosHTML;

                    subTotal.innerHTML = "$" + sumatoria;

        })*/
        //tituloProductoCarrito.innerHTML = carritoProductos[i].titulo;
        //precioProductoCarrito.innerHTML = carritoProductos[i].precio;

    
}
