import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from 'node-fetch';
import emailIcon from '../imagen/mail.png';
import passwordIcon from '../imagen/password.png';
import '../App.scss';
// import Modal from './Modal';

export const requestUsers = (email, password, navigate) => {
  const bodyData = {
    email,
    password,
  };
  return fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  }).then((resp) => {
    console.log(resp);
    if (resp.status === 200) {
      navigate('/Menu');
    }
    return resp.json();
  })
    .then((response) => {
      sessionStorage.setItem('token', response.token);
      return {};
    })
  // eslint-disable-next-line no-alert
    // .catch(() => alert('datos incorrectos'));
    .catch((error) => {
      console.log(error);
      console.log('datos incorrectos');
    });
};

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="Background-login">
      <div className="Form-login">
        <h1>Iniciar Sesión</h1>
        <div className="Form-input">
          <img src={emailIcon} className="Icon-login" alt="logo" />
          <input type="email" onChange={(e) => setEmail(e.target.value)} className="Input-login" placeholder="ingrese email" />
        </div>
        <div className="Form-input">
          <img src={passwordIcon} className="Icon-login" alt="logo" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="Input-login" placeholder="ingrese contraseña" />
        </div>
        <button data-testid="btnLogin" className="Button-login" type="button" onClick={() => requestUsers(email, password, navigate)}>
          <p className="Text-button">Iniciar Sesión</p>
        </button>
      </div>
    </div>
  );
}
