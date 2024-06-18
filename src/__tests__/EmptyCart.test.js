import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmptyCart from '../components/cart-components/EmptyCart';

test('renders EmptyCart component', () => {
  render(
    <MemoryRouter>
      <EmptyCart />
    </MemoryRouter>
  );

  const titleElement = screen.getByText(/¡Tu carrito está vacío!/i);
  expect(titleElement).toBeInTheDocument();

  const messageElement = screen.getByText(/Parece que no has añadido ningún producto al carrito todavía./i);
  expect(messageElement).toBeInTheDocument();

  const buttonElement = screen.getByRole('link', { name: /ver productos/i });
  expect(buttonElement).toBeInTheDocument();

  expect(buttonElement).toHaveAttribute('href', '/products');
});
