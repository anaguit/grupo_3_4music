import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from 'react';



function PanelCategorias() {

    var urlApi = "http://localhost:3000/products/listProducts";

    const estado = useState ([]);
    const valoresEstado = estado[0];
    const setEstado = estado[1];


         useEffect( () => { 
            fetch(urlApi)
            .then(response => response.json() )
            .then(data => {
                //console.log(data.countByCategory);
                setEstado( 
                        data.countByCategory
                    ) 
             })
            .catch(e =>console.log(e))
            
       }, [] ) 

    return (
        <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categorias con Productos publicados</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        {valoresEstado.length === 0 && <p>Cargando...</p>}
                        {valoresEstado.map((estado, i) => {
                            return(
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-info text-white shadow">
                                        <div className="card-body" >
                                            <div>
                                                <h5>{estado.nombre_categoria}</h5>
                                            </div>
                                            <hr className="sidebar-divider d-none d-md-block"/>
                                            <div>
                                                {estado.cantidad} Productos
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    
                    </div>
                </div>
            </div>
        </div>
    );
}
    
export default PanelCategorias;