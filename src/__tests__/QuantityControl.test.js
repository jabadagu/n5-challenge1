import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuantityControl from '../components/QuantityControl';

describe('QuantityControl', () => {
  const mockHandleIncrease = jest.fn();
  const mockHandleDecrease = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const customRender = (quantity, maxQuantity) => {
    render(
      <QuantityControl
        quantity={quantity}
        maxQuantity={maxQuantity}
        handleIncrease={mockHandleIncrease}
        handleDecrease={mockHandleDecrease}
      />
    );
  }

  test('renders the quantity correctly', () => {
    customRender(3,5);
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });

  test('calls handleIncrease when + button is clicked and quantity is less than maxQuantity', () => {
    customRender(3,5);
    fireEvent.click(screen.getByText('+'));
    expect(mockHandleIncrease).toHaveBeenCalledTimes(1);
  });

  test('calls handleDecrease when - button is clicked and quantity is greater than 1', () => {
    customRender(3,5);
    fireEvent.click(screen.getByText('-'));
    expect(mockHandleDecrease).toHaveBeenCalledTimes(1);
  });

  test('does not call handleIncrease when + button is clicked and quantity is equal to maxQuantity', () => {
    customRender(5,5);
    fireEvent.click(screen.getByText('+'));
    expect(mockHandleIncrease).not.toHaveBeenCalled();
  });

  test('does not call handleDecrease when - button is clicked and quantity is 1', () => {
    customRender(1,5);
    fireEvent.click(screen.getByText('-'));
    expect(mockHandleDecrease).not.toHaveBeenCalled();
  });

  test('shows the limit message when quantity is equal to or greater than maxQuantity', () => {
    customRender(5,5);
    expect(screen.getByText(/No puedes agregar más de 5 unidades/i)).toBeInTheDocument();
  });

  test('does not show the limit message when quantity is less than maxQuantity', () => {
    customRender(3,5);
    expect(screen.queryByText(/No puedes agregar más de 5 unidades/i)).not.toBeInTheDocument();
  });
});

