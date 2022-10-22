import fecth from 'node-fetch';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '../PageView/Menu';
import { getProducts } from '../Requests/requestApi';

// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
// }));

jest.mock('node-fetch', () => jest.fn());

describe('getProducts', () => {
  it('Debería ser una función', () => {
    expect(typeof getProducts).toBe('function');
  });
  it('Debería retornar datos de los productos', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';
    const json = {};
    // const resp = { json, status: 200 };
    fecth.mockResolvedValue(json);
    getProducts(token)
      .then((res) => {
        console.log(res);
        expect(res).toEqual('hola');
      })
      .catch((e) => console.log(e));
  });
});

describe('Componente Menu', () => {
  it('renderiza el boton que incrementa', () => {
    render(<Menu />);
    // imprime el virtual dom del componente
    // const btnOptionBreakfast = screen.getByTestId('option-breakfast');

    // fireEvent.click(btnOptionBreakfast);
    screen.debug();
    // expect(screen.getByTestId('btn-add-product')).toBeInTheDocument();
  });
  it('contador de incrementos - cantidad de producto', () => {

  });
});
