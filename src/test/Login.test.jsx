/** * @jest-environment jsdom */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { useNavigate } from 'react-router-dom';
// import { loginUsers } from '../Requests/requestApi';
import App from '../App';

// jest.mock('node-fetch', () => jest.fn());

// test del componente login
describe('Componente Login', () => {
  it('Debería existir el input email', () => {
    render(<App />);
    const inputEmail = screen.getByTestId('input-email');
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute('type', 'email');
  });

  it('Debería de cambiar el value al ingresar texto en casilla de email', () => {
    render(<App />);
    const inputEmail = screen.getByTestId('input-email');
    fireEvent.change(inputEmail, { target: { value: 'mesero1@gmail.com' } });
    expect(inputEmail.value).toBe('mesero1@gmail.com');
  });

  it('Debería existir el input password', () => {
    render(<App />);
    const inputPassword = screen.getByTestId('input-password');
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute('type', 'password');
  });

  it('Debería de cambiar el value al ingresar texto en casilla de password', () => {
    render(<App />);
    const inputPassword = screen.getByTestId('input-password');
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    expect(inputPassword.value).toBe('123456');
  });

  it('Debería existir el botón con className "Button-login"', () => {
    render(<App />);
    expect(screen.getByRole('button', { className: 'Button-login' })).toBeInTheDocument();
  });

  it('Debería de aparecer un mensaje de error si la casilla de email está vacía', () => {
    render(<App />);
    const inputEmail = screen.getByTestId('input-email');
    fireEvent.change(inputEmail, { target: { value: '' } });
    const buttonLogin = screen.getByRole('button', { className: 'Button-login' });
    fireEvent.click(buttonLogin);
    const spanMessage = screen.getByTestId('spanMessage');
    expect(spanMessage).toHaveTextContent('casilla vacía');
  });
});

// testear si el input está lleno con datos
// testear si el boton realiza click
// testear si hace el ruteo al modulo menú

//
// _________________________________________________________

// test de la función requestUsers
// describe('loginUsers', () => {
//   it('debería de ser una función', () => {
//     expect(typeof loginUsers).toBe('function');
//   });
//   it('tiene que retornar un objeto json con el token', () => {
//     const secret = '12345';
//     const tokenTest = {
//       token: secret,
//     };

//     const email = 'mesero1@gmail.com';
//     const password = '123456';
//     const json = { token: '12345' };
//     const resp = { json, status: 200 };
//     fetch.mockResolvedValue(resp);
//     loginUsers(email, password)
//       .then((res) => { expect(res.json).toEqual(tokenTest); });
//   });
// });
