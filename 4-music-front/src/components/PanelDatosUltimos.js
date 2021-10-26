import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from 'react';



function PanelDatosUltimos(prop) {
    //cantidad total de Usuarios traida desde la API
   // var urlApiUsuarios = "http://localhost:3000/users/show/:id";
   // url ultimo producto = http://localhost:3000/products/searchApi/22

   var urlApi = prop.urlApi;
   var tituloTraido = prop.titulo;

   const estado = useState ({nombre: 0, apellido: 0, titulo: tituloTraido});
   const valoresEstado = estado[0];
   const setEstado = estado[1];
 
   
   let traerUltimosDatos = function(url){ 
       fetch(url)
           .then(response => response.json() )
           .then(data => {console.log(data); setEstado( {nombre: data.nombre} )})
           .catch(e =>console.log(e))
        }

   const divDatosUltimos = useRef();  // en esta variable se almacena un objeto con la propiedad current
 
   useEffect( () => { 
       traerUltimosDatos(urlApi);
       divDatosUltimos.current.innerHTML= valoresEstado.nombre;
       //alert( "Montaje" ); 
   }, [] )   

        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{tituloTraido}</h6>
                    </div>
                    <div ref={divDatosUltimos}className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '25' + 'rem'}} src="assets/images/product_dummy.svg" alt="image dummy"/>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa exercitationem ratione?</p>
                    <a target="_blank" rel="nofollow" href="/">View product detail</a>
                    </div>
                </div>
            </div>
        );
    
    }
    
    export default PanelDatosUltimos;