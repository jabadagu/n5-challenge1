
import { render, fireEvent, screen  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para usar los matchers de Jest DOM
import { CartProvider, CartContext,  } from '../context/CartContext';
import { useContext } from 'react';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: key => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const CartConsumerComponent = () => {
  const { state, dispatch } = useContext(CartContext);

  const addItemToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id: 1, name: 'Product 1', price: 10, quantity: 1 }
    });
  };

  const removeItemFromCart = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id: 1 }
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART'
    });
  };

  const setProds = () => {
    dispatch({
      type: 'SET_PRODUCTS',
      payload: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]
    });
  };

  const updateProd = () => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]
    });
  };

  const addProd = () => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]
    });
  };

  const defaultState = () => {
    dispatch({
      type: '',
      payload: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]
    });
  };

  return (
    <div>
      <button onClick={addItemToCart}>Agregar al carrito</button>
      <button onClick={removeItemFromCart}>Eliminar del carrito</button>
      <button onClick={clearCart}>Limpiar carrito</button>
      <button onClick={setProds}>Establecer productos</button>
      <button onClick={updateProd}>Actualizar producto</button>
      <button onClick={addProd}>Agregar producto</button>
      <button onClick={defaultState}>Por defecto</button>
      <input
        type="number"
        value={state.cart.length > 0 ? state.cart[0].quantity : ''}
        onChange={(e) => updateQuantity(1, parseInt(e.target.value, 10))}
        data-testid="quantity-input"
      />
      <div>{state.products.length > 0 ? 'Productos establecidos' : 'Sin productos'}</div>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds item to cart', () => {
    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Agregar al carrito'));

    expect(localStorage.getItem('cart')).toEqual(
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );
  });

  test('removes item from cart', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Eliminar del carrito'));
    expect(localStorage.getItem('cart')).toEqual(JSON.stringify([]));
  });

  test('updates item quantity in cart when item exists', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );

    fireEvent.change(screen.getByTestId('quantity-input'), { target: { value: '3' } });
    expect(localStorage.getItem('cart')).toEqual(
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 3 }])
    );
  });

  test('does not update item quantity in cart when item does not exist', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 3, name: 'Product 3', price: 30, quantity: 1 }])
    );

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );

    fireEvent.change(screen.getByTestId('quantity-input'), { target: { value: '5' } });
    expect(localStorage.getItem('cart')).toEqual(
      JSON.stringify([{ id: 3, name: 'Product 3', price: 30, quantity: 1 }])
    );
  });

  test('clears the cart and removes it from localStorage', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Limpiar carrito'));
    expect(localStorage.getItem('cart')).toBeNull();
  });

  test('sets products and updates state correctly', () => {
    const cart = localStorage.getItem('cart');

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );

    expect(cart).toBeNull();
    fireEvent.click(screen.getByText('Establecer productos'));
    expect(screen.getByText('Productos establecidos')).toBeInTheDocument();
  });

  test('updates item in cart when item exists', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Actualizar producto'));
    expect(localStorage.getItem('cart')).toEqual(
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );
  });
  
  test('add new prod to current state', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Agregar producto'));
    expect(localStorage.getItem('cart')).toEqual(
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );
  });

  test('return defaul state', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );

    render(
      <CartProvider>
        <CartConsumerComponent />
      </CartProvider>
    );
    fireEvent.click(screen.getByText('Por defecto'));
    expect(localStorage.getItem('cart')).toEqual(
      JSON.stringify([{ id: 1, name: 'Product 1', price: 10, quantity: 1 }])
    );
  });

});
