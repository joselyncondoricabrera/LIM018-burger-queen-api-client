/** * @jest-environment jsdom */

import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
// import { withRouter, useNavigate } from 'react-router';
// import userEvent from '@testing-library/user-event';
// import { useNavigate } from 'react-router-dom';
// import { loginUsers } from '../Requests/requestApi';
import { BrowserRouter, useNavigate } from 'react-router-dom';
// import App from '../App';
import Login from '../PageView/Login';
// import { regexEmail } from '../PageView/Login';
// jest.mock('node-fetch', () => jest.fn());

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// test del componente login
describe('Componente Login', () => {
  it('Debería existir un input de tipo email', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputEmail = screen.getByTestId('input-email');
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute('type', 'email');
  });

  it('Debería de cambiar el value al ingresar texto en casilla de email', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputEmail = screen.getByTestId('input-email');
    fireEvent.change(inputEmail, { target: { value: 'mesero1@gmail.com' } });
    expect(inputEmail.value).toBe('mesero1@gmail.com');
  });

  it('Debería existir un input de tipo password', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputPassword = screen.getByTestId('input-password');
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute('type', 'password');
  });

  it('Debería de cambiar el value al ingresar texto en casilla de password', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputPassword = screen.getByTestId('input-password');
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    expect(inputPassword.value).toBe('123456');
  });

  it('Debería existir el botón con className "Button-login"', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button', { className: 'Button-login' })).toBeInTheDocument();
  });

  it('Debería de aparecer un mensaje de error si la casilla de email está vacía', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputEmail = screen.getByTestId('input-email');
    fireEvent.change(inputEmail, { target: { value: '' } });
    const buttonLogin = screen.getByRole('button', { className: 'Button-login' });
    fireEvent.click(buttonLogin);
    const spanMessage = screen.getByTestId('spanMessage');
    expect(spanMessage).toHaveTextContent('casilla vacía');
  });

  it('Debería de aparecer un mensaje de error si la casilla de password está vacía', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputPassword = screen.getByTestId('input-password');
    fireEvent.change(inputPassword, { target: { value: '' } });
    const buttonLogin = screen.getByRole('button', { className: 'Button-login' });
    fireEvent.click(buttonLogin);
    const spanError = screen.getByTestId('span-error');
    expect(spanError).toHaveTextContent('casilla vacía');
  });

  it('Debería de aparecer un mensaje de error si el texto ingresado no tiene formato email', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const inputEmail = screen.getByTestId('input-email');
    fireEvent.change(inputEmail, { target: { value: 'chef1@gmail' } });
    const inputPassword = screen.getByTestId('input-password');
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    const buttonLogin = screen.getByTestId('btnLogin');
    fireEvent.click(buttonLogin);
    // console.log(regexEmail);
    const spanEmailMessage = screen.getByTestId('spanMessage');
    // spanEmailMessage.value = 'correo inválido';
    // console.log(spanEmailMessage);
    await waitFor(() => {
      expect(spanEmailMessage).toHaveTextContent('correo inválido');
    });

    // process.nextTick(() => {
    //   console.log('Executed in the next iteration');
    // });
    // expect(spanEmailMessage).toHaveTextContent('correo inválido');
    // console.log(spanEmailMessage.value);
    // expect(inputEmail.value).toMatch(regexEmail);

    // expect(regexEmail.test(inputEmail.value)).toBe(false);
    // const spanEmailMessage = screen.getByTestId('spanMessage');
    // // // screen.debug();
    // expect(spanEmailMessage.value).toBe('correo inválido');
  });
});

describe('Redireccionamiento de módulos', () => {
  // const ui = userEvent.setup();
  // const navigate = jest.fn();

  // beforeEach(() => {
  //   jest.spyOn(useNavigate, 'useNavigate').mockImplementation(() => navigate);
  // });

  it('Debería direccionar hacia la vista Menu cuando se loguea correctamente el mesero', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const navigate = useNavigate();
    fireEvent.click(screen.getByTestId('btnLogin'));
    expect(navigate).toHaveBeenCalledWith('/Menu');
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
