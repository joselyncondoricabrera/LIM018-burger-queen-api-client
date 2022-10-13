/** * @jest-environment jsdom */

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { useNavigate } from 'react-router-dom';
import fetch from 'node-fetch';
import loginUsers from './Requests/LoginRequest';
// import App from './App';

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
describe('loginUsers', () => {
  // it('debería de ser una función', () => {
  //   expect(typeof requestUsers).toBe('function');
  // });
  it('tiene que retornar', () => {
    const secret = '12345';
    const tokenTest = {
      token: secret,
    };

    const email = 'mesero1@gmail.com';
    const password = '123456';
    const json = { token: '12345' };
    const resp = { json, status: 200 };
    fetch.mockResolvedValue(resp);
    // fetch.mockResolvedValue({
    //   status: 200,
    //   json: () => Promise.resolve({ token: '1234567' }),
    // });
    loginUsers(email, password)
      .then((res) => { expect(res.json).toEqual(tokenTest); });
  });
});
