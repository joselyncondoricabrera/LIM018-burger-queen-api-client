import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from 'node-fetch';
import emailIcon from '../imagen/mail.png';
import passwordIcon from '../imagen/password.png';
import '../App.scss';

export default function Login() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-shadow
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-shadow
  const [password, setPassword] = useState('');
  const requestUsers = () => {
    const bodyData = {
      email: { email }.email,
      password: { password }.password,
    };
    fetch('http://localhost:3001/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    }).then((res) => res.json())
      .then((response) => {
        sessionStorage.setItem('token', response.token);
        const token = sessionStorage.getItem('token');
        if (token !== null) {
          navigate('/Menu');
          // eslint-disable-next-line no-alert
        } else alert('datos incorrectos');
        // eslint-disable-next-line no-alert
      }).catch(() => alert('datos incorrectos'));
  };

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
        <button className="Button-login" type="button" onClick={requestUsers}>
          <p className="Text-button">Iniciar Sesión</p>
        </button>
      </div>
    </div>
  );
}
