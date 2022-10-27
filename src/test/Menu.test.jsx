import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '../PageView/Menu';
// import getProducts from '../Requests/requestApi';

const mockNavigate = jest.fn();

jest.mock('../Requests/requestApi.js');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// jest.mock('node-fetch', () => jest.fn());

describe('Componente Menu', () => {
  it('Debería existir el boton de opción de bebidas', () => {
    render(<Menu />);
    const buttonDrinks = screen.getByTestId('btn-drink');
    expect(buttonDrinks).toBeInTheDocument();
  });

  it('Debería existir el boton de opción de almuerzo y cena', () => {
    render(<Menu />);
    const buttonDrinks = screen.getByTestId('btn-lunch-dinner');
    expect(buttonDrinks).toBeInTheDocument();
  });

  it('Debería existir el boton de opción de desayuno', () => {
    render(<Menu />);
    const buttonDrinks = screen.getByTestId('btn-breakfast');
    expect(buttonDrinks).toBeInTheDocument();
  });

  // falta ******************
  it.only('Debería existir las imagenes de los productos al escoger una opción', () => {
    render(<Menu />);
    const buttonBreakfast = screen.getByTestId('btn-breakfast');
    const imageProducts = screen.findByTestId('image-products');
    fireEvent.click(buttonBreakfast);
    // expect(imageProducts).toBeInTheDocument();
    screen.debug();
  });

  it('Debería de existir un input para registrar el nombre del cliente', () => {
    render(<Menu />);
    const inputNameClient = screen.getByTestId('input-name-client');
    expect(inputNameClient).toBeInTheDocument();
  });

  it('Debería de cambiar el value al ingresar texto en el input del nombre del cliente', () => {
    render(<Menu />);
    const inputNameClient = screen.getByTestId('input-name-client');
    fireEvent.change(inputNameClient, { target: { value: 'Nino' } });
    expect(inputNameClient.value).toBe('Nino');
  });
  // it('Debería cambiar de color cuando se realiza click al boton almuerzo y cena', () => {
  //   render(<Menu />);
  //   const buttonLunchDinner = screen.getByTestId('btn-lunch-dinner');
  //   fireEvent.click(buttonLunchDinner);
  //   expect(buttonLunchDinner).toHaveStyle(' background-color: rgb(255, 148, 9) ');
  // });
});
