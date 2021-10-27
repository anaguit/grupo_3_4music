import './components/app.css';
import PanelContador from './components/PanelContador';
import BarraLateral from './components/BarraLateral';
import PanelDatosUltimos from './components/PanelDatosUltimos';
import PanelCategorias from './components/PanelCategorias';
import BarraSuperior from './components/BarraSuperior';
import './components/tipografias.css';
import { Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="wrapper" id="wrapper">
        <BarraLateral></BarraLateral>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <BarraSuperior></BarraSuperior>
        
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">4Music Dashboard</h1>
              </div>
              <div className="row">
                <PanelContador urlApi="http://localhost:3000/users/list" titulo="Total de Usuarios"></PanelContador>
                <PanelContador urlApi="http://localhost:3000/products/listProducts" titulo="Total de Productos"></PanelContador>
                <PanelContador urlApi="http://localhost:3000/products/countCategory" titulo="Total de Categorias"></PanelContador>
              </div>
              <div className="row">
                <PanelDatosUltimos urlApi="http://localhost:3000/users/list" titulo="Ultimo usuario creado"></PanelDatosUltimos>
                <PanelDatosUltimos urlApi="http://localhost:3000/products/searchApi/:id" titulo="Ultimo producto creado"></PanelDatosUltimos>

                <PanelCategorias></PanelCategorias>
              </div>
            </div>
    </div>
    <footer className="sticky-footer bg-white">
				<div className="container my-auto">
					<div className="copyright text-center my-auto">
						<span>Copyright &copy; 4Music-Dashboard 2021</span>
					</div>
				</div>
			</footer>
    </div>
    
  
    </div>
  </div> 
       
  );
}

export default App;
