/** * @jest-environment jsdom */

import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
// import { useNavigate } from 'react-router-dom';
import App from './App';
import { requestUsers } from './PageView/Login';

// const fetch = require('node-fetch');

// jest.mock('node-fetch', () => jest.fn());

describe('Componente Login', () => {
  it('Debería existir el botón con className "Button-login"', () => {
    render(<App />);
    expect(screen.getByRole('button', { className: 'Button-login' })).toBeInTheDocument();
  });

  it('Debería de ejecutar el evento onclick', () => {
    render(<App />);
    screen.debug();
    // const btnLogin = app.queryByText('Iniciar Sesión');
    // const requestUsers = jest.fn();
    fireEvent.click(screen.queryByTestId('btnLogin'));
    expect(requestUsers).toHaveBeenCalled();
  });
});

// eslint-disable-next-line max-len
// const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';

// const jsonMock = { token: secret };
// const users = {
//   email: 'mesero1@gmail.com',
//   password: '123456',
// };

// describe('requestUsers', () => {
//   it('debería de ser una función', () => {
//     expect(typeof requestUsers).toBe('function');
//   });
//   it('debería autenticar al usuario y dar una ruta', () => {
//     global.fetch = () => Promise.resolve({
//       status: 200,
//       json: () => Promise.resolve(jsonMock),
//     });

//     requestUsers(users.email, users.password).then((res) => {
//       expect(res).toEqual(jsonMock);
//     });
//     // console.log(response);
//     // expect(response).resolve.toEqual(jsonMock);
//   });
//   // requestUsers(users.email, users.password).then((res) => {
//   //   console.log(res);
//   //   expect(res.json()).toEqual({ token: secret });
//   // });
//   // });
// });
