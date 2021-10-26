import logo from './logo.svg';
import './App.css';
import PanelContador from './components/PanelContador';
import { Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <PanelContador urlApi="http://localhost:3000/users/list" titulo="Total de Usuarios"></PanelContador>
        <PanelContador urlApi="http://localhost:3000/products/listProducts" titulo="Total de Productos"></PanelContador>
        <PanelContador urlApi="http://localhost:3000/products/countCategory" titulo="Total de Categorias"></PanelContador>
      </header>
    </div>
  );
}

export default App;
