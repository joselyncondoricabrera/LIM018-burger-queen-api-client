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

// describe('Componente Login', () => {
//   it('Debería existir el botón con className "Button-login"', () => {
//     render(<App />);
//     expect(screen.getByRole('button', { className: 'Button-login' })).toBeInTheDocument();
//   });

//   it('Debería de ejecutar el evento onclick', () => {
//     render(<App />);
//     screen.debug();
//     // const btnLogin = app.queryByText('Iniciar Sesión');
//     // const requestUsers = jest.fn();
//     fireEvent.click(screen.queryByTestId('btnLogin'));
//     expect(requestUsers).toHaveBeenCalled();
//   });
// });

// describe('Componente Login', () => {
//   it('Debería existir el botón con className "Button-login"', () => {

//   });
// });

describe('requestUsers', () => {
  it('debería ser una función', () => {
    expect(typeof requestUsers).toBe('function');
  });

  it('Debería poder registrar a un usuario', () => {
    requestUsers('mesero2@gmail.com', '123456', undefined)
      .then((res) => { res.json(); })
      .then((resp) => console.log(resp));
  });
});
