import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/home';

describe('Home component', () => {
  test('renders banner title, subtitle, image, and link', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido a MyStore')).toBeInTheDocument();

    expect(screen.getByText('Vas a encontrar diversos tipos de abarrotes para el hogar')).toBeInTheDocument();

    const buyButton = screen.getByRole('button', { name: /Ir a comprar/i });
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toHaveAttribute('href', '/products');

    const bannerImage = screen.getByAltText('Banner');
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute('src', expect.stringContaining('home.webp'));

  });
});
