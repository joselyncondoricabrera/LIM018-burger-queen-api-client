/** * @jest-environment jsdom */

import React from 'react';
import { render, screen } from '@testing-library/react';
// import { useNavigate } from 'react-router-dom';
import fetch from 'node-fetch';
import App from './App';
import { requestUsers } from './PageView/Login';

// jest.mock('node-fetch');
jest.mock('node-fetch', () => jest.fn());

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
//--------------------------------------------------------------------------------

// test de la función requestUsers
describe('requestUsers', () => {
  // it('debería de ser una función', () => {
  //   expect(typeof requestUsers).toBe('function');
  // });
  it('debería autenticar al usuario y dar una ruta', () => {
    // eslint-disable-next-line max-len
    const secret = '12345';
    const token = {
      token: secret,
    };

    const email = 'mesero1@gmail.com';
    const password = '123456';
    // const navigate = '';
    console.log(fetch);
    fetch.mockResolvedValue({
      status: 200,
      json:()=> Promise.resolve({ token: '1234567' }),
    });
    const mock = jest.fn();
    requestUsers(email, password, mock)
      .then((data) => { expect(data).toEqual(token.token); })
      .catch((error) => console.log(error));
    // .then((res) => {
    //   expect(res.token).toEqual(token.token);
    // })
  });
});
