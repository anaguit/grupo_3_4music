import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from 'react';



function PanelDatosUltimos(prop) {


   var urlApi = prop.urlApi;
   var tituloTraido = prop.titulo;
   var tabla = prop.tabla;

   const estado = useState ({campo1: "", campo2: "", campoFoto:"", titulo: tituloTraido});
   const valoresEstado = estado[0];
   const setEstado = estado[1];
 
  
   let traerUltimosDatos = function(url){ 
       fetch(url)
           .then(response => response.json() )
           .then(data => {
               if(tabla=="users"){
                  
                setEstado( {campo1: data.users[0].nombre, 
                    campo2: data.users[0].apellido,
                    campoFoto: data.users[0].foto_perfil} 
                    )
               }else if(tabla=="products"){
                   
                setEstado( {campo1: data.products[0].titulo, 
                    apellido: data.products[0].marca,
                    campoFoto: data.products[0].fotos[0].url} 
                    )
               }
               console.log(); 
               
            })
           .catch(e =>console.log(e))
        }

   const divDatosUltimos = useRef();  // en esta variable se almacena un objeto con la propiedad current
   const divFotoPerfil = useRef();
   
   
   useEffect( () => { 
        traerUltimosDatos(urlApi);
        divDatosUltimos.current.innerHTML= valoresEstado.campo1 + ' ' + valoresEstado.campo2;
        if(tabla=="users"){
            divFotoPerfil.current.innerHTML = '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="http://localhost:3000/images/users/'+valoresEstado.campoFoto+'" alt="image dummy"></img>';
        }else if(tabla =="products"){
            
            divFotoPerfil.current.innerHTML = '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="http://localhost:3000/images/products/'+valoresEstado.campoFoto+'" alt="image dummy"></img>';
        
        }
        //alert( "Montaje" ); 
        
   }, [] ) 
   



   const isFirstRun = useRef(true);
   useEffect( () => { 
    if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
    traerUltimosDatos(urlApi);
    
    divDatosUltimos.current.innerHTML= valoresEstado.campo1 + ' ' + valoresEstado.campo2;
    if(tabla=="users"){
        divFotoPerfil.current.innerHTML = '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="http://localhost:3000/images/users/'+valoresEstado.campoFoto+'" alt="image dummy"></img>';
    }else if(tabla =="products"){
            
        divFotoPerfil.current.innerHTML = '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="http://localhost:3000/images/products/'+valoresEstado.campoFoto+'" alt="image dummy"></img>';

    }
    //alert( "Actualizacion" ); 
    
}, [valoresEstado] ) 

        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{tituloTraido}</h6>
                    </div>
                    
                    <div className="card-body">
                        <h4 ref={divDatosUltimos}>

                        </h4>
                        <div ref={divFotoPerfil} className="text-center">
                            
                        </div>
                            <p></p>
                        <a target="_blank" rel="nofollow" href="/">View product detail</a>
                    </div>
                </div>
            </div>
        );
    
    }
    
    export default PanelDatosUltimos;