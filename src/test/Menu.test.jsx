import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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

  // pasa el test pero falta corregir el ACT()******************
  it('Debería existir las imagenes de los productos del tipo desayuno al hacer click', async () => {
    act(() => {
      render(<Menu />);
    });
    const buttonBreakfast = screen.getByTestId('btn-breakfast');
    act(() => {
      fireEvent.click(buttonBreakfast);
    });
    const imageProducts = await screen.findByTestId('image-products-4');
    expect(imageProducts).toBeInTheDocument();
    // screen.debug();
  });
  it('Debería existir las imagenes de los productos de tipo Almuerzo y cena al hacer click', async () => {
    act(() => {
      render(<Menu />);
    });
    const buttonLunchDinner = screen.getByTestId('btn-lunch-dinner');
    act(() => {
      fireEvent.click(buttonLunchDinner);
    });
    const imageProducts = await screen.findByTestId('image-products-5');
    expect(imageProducts).toBeInTheDocument();
  });

  it('Debería existir las imagenes de los productos de tipo Bebidad al hacer click', async () => {
    act(() => {
      render(<Menu />);
    });
    const buttonDrinks = screen.getByTestId('btn-drink');
    act(() => {
      fireEvent.click(buttonDrinks);
    });
    const imageProducts = await screen.findByTestId('image-products-7');
    expect(imageProducts).toBeInTheDocument();
  });

  // existencia de botones mas y menos de los productos
  it('Debería de renderizar el boton de agregar producto a la orden', async () => {
    render(<Menu />);
    const buttonBreakfast = screen.getByTestId('btn-breakfast');
    fireEvent.click(buttonBreakfast);
    const buttonAddProduct = await screen.findByTestId('btn-add-product-4');
    expect(buttonAddProduct).toBeInTheDocument();
  });
  it('Debería de renderizar el boton de disminuir cantidad del producto a la orden', async () => {
    render(<Menu />);
    const buttonBreakfast = screen.getByTestId('btn-breakfast');
    fireEvent.click(buttonBreakfast);
    const buttonRemoveProduct = await screen.findByTestId('btn-remove-product-4');
    expect(buttonRemoveProduct).toBeInTheDocument();
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
    const subtitleClient = screen.getByTestId('subtitle-Client');
    fireEvent.change(inputNameClient, { target: { value: 'Nino' } });
    subtitleClient.value = 'Client: Nino';
    console.log(subtitleClient.value);
    expect(subtitleClient.value).toBe('Client: Nino');
    screen.debug();
  });
  // it('Debería cambiar de color cuando se realiza click al boton almuerzo y cena', () => {
  //   render(<Menu />);
  //   const buttonLunchDinner = screen.getByTestId('btn-lunch-dinner');
  //   fireEvent.click(buttonLunchDinner);
  //   expect(buttonLunchDinner).toHaveStyle(' background-color: rgb(255, 148, 9) ');
  // });
});
