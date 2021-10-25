import React from 'react';
import { useState, useEffect, useRef } from 'react';

function TotalUsuario() {
    //cantidad total de Usuarios traida desde la API


    const estado = useState ({totalUsuarios: 0});
    const valoresEstado = estado[0];
    const setEstado = estado[1];
  
    
    let traerTotalUsuarios = (url) => { fetch(url)
        .then(response => response.json() )
        .then(data =>  setEstado( {totalUsuarios: data.data.count} ))
        .catch(e =>console.log(e))
         }

    const divCantUsuarios = useRef();  // en esta variable se almacena un objeto con la propiedad current
  
    useEffect( () => { 
        traerTotalUsuarios("localhost:3000/users/list");
        divCantUsuarios.current.innerHTML=valoresEstado.totalUsuarios;
      alert( "Montaje" ); 
    }, [] )   
  
    const isFirstRun = useRef(true);
    
    useEffect( () => { 
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      alert( "Actualizacion" ); 
     // console.log(titulo.current.innerHTML="Terminamos el curso!");
    }, [valoresEstado] )   
  
  
    useEffect( () => { return () => 
      { console.log( "Desmontaje" );   } 
    }, [] ) 
  
    
   
        return (
            <div className="col-md-4 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> Total de Usuarios Registrados</div>
                                <div ref="divCantUsuarios" className="h5 mb-0 font-weight-bold text-gray-800">ACA SE TENDRIAN QUE CARGAR LOS DATOS TRAIDOS...</div>
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
  
  export default TotalUsuario;
  