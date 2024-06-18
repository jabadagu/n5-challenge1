import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CartSummary from '../components/cart-components/CartSummary';

describe('CartSummary', () => {
  it('renders CartSummary component correctly', () => {
    const totalItems = 3;
    const totalPrice = 250;

    render(
      <Router>
        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
      </Router>
    );

    expect(screen.getByText(`Productos: ${totalItems}`)).toBeInTheDocument();
    expect(screen.getByText(`Total: S/ ${totalPrice.toFixed(2)}`)).toBeInTheDocument();

    const proceedButton = screen.getByText('Proceder al Pago');
    expect(proceedButton).toBeInTheDocument();
    expect(proceedButton).toHaveClass('w-100');

    const continueShoppingButton = screen.getByText('Seguir comprando');
    expect(continueShoppingButton).toBeInTheDocument();
    expect(continueShoppingButton).toHaveAttribute('href', '/products'); 
  });
});

