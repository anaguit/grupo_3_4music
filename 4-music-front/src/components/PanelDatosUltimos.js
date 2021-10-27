import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from 'react';



function PanelDatosUltimos(prop) {


   var urlApi = prop.urlApi;
   var tituloTraido = prop.titulo;

   const estado = useState ({nombre: "", apellido: "", fotoPerfil:"", titulo: tituloTraido});
   const valoresEstado = estado[0];
   const setEstado = estado[1];
 
   
   let traerUltimosDatos = function(url){ 
       fetch(url)
           .then(response => response.json() )
           .then(data => {
               console.log(data.users[0].foto_perfil); 
               setEstado( {nombre: data.users[0].nombre, 
                apellido: data.users[0].apellido,
                fotoPerfil: data.users[0].foto_perfil} 
                )
            })
           .catch(e =>console.log(e))
        }

   const divDatosUltimos = useRef();  // en esta variable se almacena un objeto con la propiedad current
   const divFotoPerfil = useRef();
   
   
   useEffect( () => { 
        traerUltimosDatos(urlApi);
        divDatosUltimos.current.innerHTML= valoresEstado.nombre + ' ' + valoresEstado.apellido;
        divFotoPerfil.current.innerHTML = '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="http://localhost:3000/images/users/'+valoresEstado.fotoPerfil+'" alt="image dummy"></img>';
        //alert( "Montaje" ); 
   }, [] ) 
   



   const isFirstRun = useRef(true);
   useEffect( () => { 
    if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
    traerUltimosDatos(urlApi);
    divDatosUltimos.current.innerHTML= valoresEstado.nombre + ' ' + valoresEstado.apellido;
    divFotoPerfil.current.innerHTML = '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="http://localhost:3000/images/users/'+valoresEstado.fotoPerfil+'" alt="image dummy"></img>';
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