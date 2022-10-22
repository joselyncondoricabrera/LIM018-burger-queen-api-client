import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsers } from '../Requests/requestApi';
import emailIcon from '../imagen/mail.png';
import passwordIcon from '../imagen/password.png';
import '../App.scss';

const { Buffer } = require('buffer/');

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = () => {
    loginUsers(email, password)
      // eslint-disable-next-line consistent-return
      .then((resp) => {
        if (resp.status === 200) { return resp.json(); }
      })
      .then((response) => {
        sessionStorage.setItem('token', response.token);
        const token = sessionStorage.getItem('token');
        function parseJwt(jwt) {
          return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
        }
        console.log((parseJwt(token).role));
        if (parseJwt(token).role === 'mesero') {
          navigate('/Menu');
        } else {
          navigate('/OrdersChef');
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('datos incorrectos');
      });
  };

  return (
    <div className="Background-login">
      <div className="Form-login">
        <h1>Iniciar Sesión</h1>
        <div className="Form-input">
          <img src={emailIcon} className="Icon-login" alt="logo" />
          <input type="email" data-testid="input-email" onChange={(e) => setEmail(e.target.value)} className="Input-login" placeholder="ingrese email" />
        </div>
        <div className="Form-input">
          <img src={passwordIcon} className="Icon-login" alt="logo" />
          <input type="password" data-testid="input-password" onChange={(e) => setPassword(e.target.value)} className="Input-login" placeholder="ingrese contraseña" />
        </div>
        <button data-testid="btnLogin" className="Button-login" type="button" onClick={() => onClickLogin()}>
          <p className="Text-button">Iniciar Sesión</p>
        </button>
      </div>
    </div>
  );
}
