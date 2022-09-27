import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // Navigate,
} from 'react-router-dom';
import fetch from 'node-fetch';
import emailIcon from './imagen/mail.png';
import passwordIcon from './imagen/password.png';
import './App.scss';
import './Menu.scss';

// eslint-disable-next-line prefer-const
// let navigate = useNavigate();
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

const requestUsers = (userEmail, userPassword) => new Promise((resolve) => {
  const emailInput = userEmail;
  const passwordInput = userPassword;
  const bodyData = {
    email: emailInput.email,
    password: passwordInput.password,
  };
    // console.log(bodyData);
  resolve(fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  }));
});

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
        <button
          className="Button-login"
          type="button"
          onClick={() => {
            requestUsers({ email }, { password })
              .then((res) => res.json())
              .then((response) => {
                sessionStorage.setItem('token', response.token);
                const token = sessionStorage.getItem('token', response.token);
                if (token !== null) {
                  // console.log('si se pudo');
                  window.location.href = '/Menu';
                  // History.pushState('Menu', '/Menu');
                // eslint-disable-next-line no-alert
                } else alert('datos incorrectos');
              // eslint-disable-next-line no-alert
              }).catch(() => alert('datos incorrectos'));
          }}
        >
          <p className="Text-button">Iniciar Sesión</p>
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
      </div>
    </div>
  );
}
// insonnia o postman
