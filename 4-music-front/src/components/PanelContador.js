import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from 'react';
//import propTypes from 'prop-types';


function PanelContador(prop) {
    //cantidad total de Usuarios traida desde la API
   // var urlApiUsuarios = "http://localhost:3000/users/list";

    var urlApi = prop.urlApi;
    var tituloTraido = prop.titulo;

    const estado = useState ({total: 0, titulo: tituloTraido});
    const valoresEstado = estado[0];
    const setEstado = estado[1];
  
    
    let traerTotalUsuarios = function(url){ 
        fetch(url)
            .then(response => response.json() )
            .then(data => {console.log(data); setEstado( {total: data.count} )})
            .catch(e =>console.log(e))
         }

    const divContador = useRef();  // en esta variable se almacena un objeto con la propiedad current
  
    useEffect( () => { 
        traerTotalUsuarios(urlApi);
        divContador.current.innerHTML= valoresEstado.total;
        //alert( "Montaje" ); 
    }, [] )   
  
   
        return (
            <div className="col-md-4 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> {tituloTraido}</div>
                                <div ref={divContador} className="h5 mb-0 font-weight-bold text-gray-800">{valoresEstado.total}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    
  }
  
  export default PanelContador;
  