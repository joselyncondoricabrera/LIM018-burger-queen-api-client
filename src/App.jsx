import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import fetch from 'node-fetch';
import emailIcon from './imagen/mail.png';
import passwordIcon from './imagen/password.png';
import './App.scss';
import './Menu.scss';

const history = useHistory();

// const bodyData = {
//   email: "iam@fakel.lol",
//   password: "apasswordtochange",
// };

// const requestApi = () => {
//   fetch('http://localhost:3001/auth', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(bodyData),
//   });
// };

// fetch('http://localhost:3001/users')
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// function ButtonLogin(props) {
//   return (
//     <button
//       className="Button-login"
//       type="button"
//       onClick={() => {
//         const emailInput = {props.email};
//         const passwordInput = {props.password};
//         const bodyData = {
//           email: emailInput.email,
//           password: passwordInput.password,
//         };
//           // console.log(bodyData);
//         fetch('http://localhost:3001/auth', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(bodyData),
//         });
//       }}
//     >
//       <p className="Text-button">Send Request</p>
//     </button>
//   );
// }

const requestUsers = (userEmail, userPassword) => {
  const emailInput = userEmail;
  const passwordInput = userPassword;
  const bodyData = {
    email: emailInput.email,
    password: passwordInput.password,
  };
  // console.log(bodyData);
  fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  });
  // console.log(sessionStorage.getItem('token'));
};

function Login() {
  // eslint-disable-next-line no-shadow
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-shadow
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
        <button className="Button-login" type="button" onClick={() => history.push('/Menu')}>ingresar</button>
        <button
          className="Button-login"
          type="button"
          onClick={() => {
            requestUsers({ email }, { password });
          }}
        >
          <p className="Text-button">Send Request</p>
        </button>
      </div>
    </div>

  );
}

export default function App() {
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
      <button type="button" className="Module-menu Module"><Link className="Options" to="/Menu">Menú</Link></button>
      <button type="button" className="Module-orders Module"><Link className="Options" to="/Orders">Ordenes</Link></button>
      <button type="button" className="Btn-logOut"><Link className="Options" to="/">Salir</Link></button>
    </div>
  );
}

function Menu() {
  sessionStorage.setItem('token', '123');
  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image">
        <h2 className="Title">Menú</h2>
        <div className="Menu-options-container">
          <div className="Menu-options">Almuerzo y cena</div>
          <div className="Menu-options">Desayuno</div>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image">
        <h2 className="Title">Lista de ordenes</h2>
        <div className="Card-orders">
          <div className="Card-text">
            <p>contenido</p>
          </div>
          <div className="Container-buttons">
            <button type="button" className="Btn-card">Listo</button>
            <button type="button" className="Btn-card">Entregar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
// insonnia o postman
