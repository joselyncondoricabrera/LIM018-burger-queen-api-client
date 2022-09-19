/* eslint-disable quotes */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import email from './imagen/email.png';
import key from './imagen/key2.png';
import './App.scss';

export function Login() {
  return (
    <div className="Background-login">
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

        <button type="button"><Link to="/Login">Ingresar</Link></button>
      </div>

    </div>

  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export function Home() {
  return (
    <div>
      <h2 className="Title">Home</h2>
      <button type="button"><Link to="/Login">Enviar Pedido</Link></button>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h2 className="Title">Users</h2>
    </div>
  );
}

//insonnia o postman