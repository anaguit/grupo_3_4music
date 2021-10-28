import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from 'react';



function PanelCategorias() {

    var urlApi = "http://localhost:3000/products/listProducts";

    const estado = useState ({nombreCategoria:"", cantidadProductos:0});
    const valoresEstado = estado[0];
    const setEstado = estado[1];

    let traerCategorias = function(url){ 
        fetch(url)
            .then(response => response.json() )
            .then(data => {
                //console.log(data.countByCategory);
                
                for(let i=0; i<data.countByCategory.length; i++){
                    setEstado( {
                        nombreCategoria:data.countByCategory.nombre_categoria,
                        cantidadProductos:data.countByCategory.cantidad} 
                         )
                }
               
                 
                
             })
            .catch(e =>console.log(e))
         }

         const divCategorias = useRef();

         useEffect( () => { 
            traerCategorias(urlApi);
            //divDatosUltimos.current.innerHTML= valoresEstado.campo1 + ' ' + valoresEstado.campo2;
            
            //alert( "Montaje" ); 
            
       }, [] ) 

    return (
        <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categorias de Productos</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="card bg-info text-white shadow">
                                <div ref={divCategorias} className="card-body">
                                    Category 01
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
    
export default PanelCategorias;