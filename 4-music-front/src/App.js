import logo from './logo.svg';
import './App.css';
import TotalUsuario from './components/TotalUsuario';
import { Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TotalUsuario></TotalUsuario>
      </header>
    </div>
  );
}

export default App;
