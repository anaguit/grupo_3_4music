window.addEventListener("load", function(){
    let formularioBusqueda = document.getElementById("barraBusqueda");
    let barraBusqueda = document.getElementById("busqueda");
    let inputGroup = document.querySelector(".input-group");

    formularioBusqueda.addEventListener("submit", function(e){
        e.preventDefault();

        
        if(screen.width < "768"){
            
            barraBusqueda.style.display="block";
            inputGroup.style.width="97%";
            if(screen.width < "540" ){
                formularioBusqueda.style.width="95%";
                formularioBusqueda.style.margin="20px auto";
                
            }
            else{
                formularioBusqueda.style.width="45%"; 
            }   
        }

        if (barraBusqueda.value === null || barraBusqueda.value == "" || barraBusqueda.value == "Buscar Productos..."){
          
        }
        else{
            formularioBusqueda.submit(); //Envio el formulario
        }
    })

})