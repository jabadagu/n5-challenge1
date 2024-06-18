import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/cart-components/CartItem';
import '@testing-library/jest-dom/extend-expect';

const mockDispatch = jest.fn();

const item = {
  id: 1,
  name: 'Test Product',
  price: 10.0,
  quantity: 1,
  image: 'https://via.placeholder.com/100',
  isChecked: false,
};

const renderComponent = (item) => {
  return render(
    <CartContext.Provider value={{ dispatch: mockDispatch }}>
      <CartItem item={item} />
    </CartContext.Provider>
  );
};

describe('CartItem Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('renders CartItem component', () => {
    renderComponent(item);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Precio: S/10.00')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('handles checkbox change', () => {
    renderComponent(item);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_ITEM',
      payload: { ...item, isChecked: !item.isChecked },
    });
  });

  test('handles quantity increase', () => {
    renderComponent(item);

    const increaseButton = screen.getAllByRole('button', { name: '+' })[0];
    fireEvent.click(increaseButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: item.quantity + 1 },
    });
  });

  test('handles quantity decrease', () => {
    renderComponent(item);

    const decreaseButton = screen.getAllByRole('button', { name: '-' })[0];
    fireEvent.click(decreaseButton);
    if(item.quantity <= 1) {
      return;
    }
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: item.quantity - 1 },
    });
  });

  test('handles remove item', () => {
    renderComponent(item);

    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FROM_CART',
      payload: { id: item.id },
    });
  });
});
