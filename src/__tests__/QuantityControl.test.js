import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuantityControl from '../components/QuantityControl';

describe('QuantityControl component', () => {
  test('renders QuantityControl with initial quantity', () => {
    const quantity = 5;
    const handleIncrease = jest.fn();
    const handleDecrease = jest.fn();

    render(
      <QuantityControl
        quantity={quantity}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
    );

    const quantityInput = screen.getByDisplayValue('5');
    expect(quantityInput).toBeInTheDocument();
    const decreaseButton = screen.getByRole('button', { name: '-' });
    const increaseButton = screen.getByRole('button', { name: '+' });
    expect(decreaseButton).toBeInTheDocument();
    expect(increaseButton).toBeInTheDocument();
  });

  test('calls handleIncrease and handleDecrease when buttons are clicked', () => {
    const handleIncrease = jest.fn();
    const handleDecrease = jest.fn();

    render(
      <QuantityControl
        quantity={3}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
    );


    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(handleIncrease).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: '-' }));
    expect(handleDecrease).toHaveBeenCalledTimes(1);
  });
});
