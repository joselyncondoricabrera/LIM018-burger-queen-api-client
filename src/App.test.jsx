import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './PageView/Login';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Componente Login', () => {
  it('Debería de existir el boton "Button-Login"', () => {
    render(<App />);
    expect(screen.getByRole('button', { className: 'Button-login' })).toBeInTheDocument();
  });
});

describe('requestUser', () => {
  it('Debería ser una función', () => {
    expect().toBe('function');
  });
});
