import React from 'react';

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
