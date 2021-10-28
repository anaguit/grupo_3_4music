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
 
   
   useEffect( () => { 

        fetch(urlApi)
           .then(response => response.json() )
           .then(data => {
               if(tabla=="users"){
                  
                setEstado( {campo1: data.users[0].nombre, 
                    campo2: data.users[0].apellido,
                    campoFoto: <img class="img-fluid px-3 px-sm-4 mt-3 mb-4"  src={"http://localhost:3000/images/users/"+data.users[0].foto_perfil}  alt="image dummy"></img>                } 
                    );
                }else if(tabla=="products"){
                   
                setEstado( {campo1: data.products[0].titulo, 
                campo2: data.products[0].marca,
                campoFoto: <img class="img-fluid px-3 px-sm-4 mt-3 mb-4"  src={"http://localhost:3000/images/products/"+data.products[0].fotos[0].url}  alt="image dummy"></img>
                });
               }
            
            })
           .catch(e =>console.log(e))
    
   }, [] ) 
   
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{tituloTraido}</h6>
                    </div>
                    
                    <div className="card-body">
                        <h4>
                            {valoresEstado.campo1 + ' ' + valoresEstado.campo2}
                        </h4>
                        <div className="text-center">                     
                            {valoresEstado.campoFoto}
                        </div>
                            <p></p>
                        <a target="_blank" rel="nofollow" href="/">View product detail</a>
                    </div>
                </div>
            </div>
        );
    
    }
    
    export default PanelDatosUltimos;