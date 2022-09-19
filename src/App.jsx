/* eslint-disable quotes */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import email from './imagen/mail.png';
import password from './imagen/password.png';
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
          <img src={password} className="Icon-login" alt="logo" />
          <input type="text" className="Input-login" placeholder="ingrese contraseña" />
        </div>
        <button className="Button-login" type="button"><Link className="Text-button" to="/Menu">Ingresar</Link></button>
      </div>
    </div>

  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

function NavBar() {
  return (
    <div>
      <button type="button"><Link to="/Menu">Menu</Link></button>
      <button type="button"><Link to="/Orders">Lista de ordenes</Link></button>
      <button type="button"><Link to="/">Salir</Link></button>
    </div>
  );
}

function Menu() {
  return (
    <div>
      <NavBar />
      <h2 className="Title">Menú</h2>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <NavBar />
      <h2 className="Title">Lista de ordenes</h2>
    </div>
  );
}
// insonnia o postman
