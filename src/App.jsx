/* eslint-disable quotes */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import email from './imagen/email.png';
import key from './imagen/key2.png';
import './App.scss';

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export function Login() {
  return (
    <div className="Form-login">
      <h1>Iniciar Sesión</h1>
      <div className="Form-input">
        <img src={email} className="Icon-login" alt="logo" />
        <input type="text" className="Input-login" placeholder="ingrese email" />
      </div>
      <div className="Form-input">
        <img src={key} className="Icon-login" alt="logo" />
        <input type="text" className="Input-login" placeholder="ingrese contraseña" />
      </div>

      <button type="button"> Enviar </button>
    </div>
  );
}
export function Ruta() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
