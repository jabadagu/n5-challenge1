import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from '../components/product-components/ProductCard';
import ProductModal from '../components/modals/ModalAddProductToCart';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

jest.mock('../components/modals/ModalAddProductToCart.js', () => jest.fn(() => null));

describe('ProductCard component', () => {
  const product = {
    id: 1,
    name: 'Producto de prueba',
    price: 25.50,
    image: 'https://dummyimage.com/600x400/000/fff',
    amount: 5,
  };

  const mockUpdateCartCount = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders product card with product details', () => {
    render(
      <Router>
        <ProductCard product={product} updateCartCount={mockUpdateCartCount} />
      </Router>
    );

    expect(screen.getByText('Producto de prueba')).toBeInTheDocument();
    expect(screen.getByText('Precio: $25.50')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Comprar' })).toBeEnabled();
  });


  test('shows modal when "Comprar" button is clicked', () => {
    render(
      <Router>
        <ProductCard product={product} updateCartCount={mockUpdateCartCount} />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));

    expect(ProductModal).toHaveBeenCalledWith(expect.objectContaining({ show: true }), expect.anything());
    const cart = JSON.parse(localStorage.getItem('cart'));
    expect(cart).toEqual([{ ...product, quantity: 1, isChecked: true }]);
  });

  test('adds product to cart if not already in cart', () => {
    render(
      <Router>
        <ProductCard product={product} updateCartCount={mockUpdateCartCount} />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));

    const cart = JSON.parse(localStorage.getItem('cart'));
    expect(cart).toEqual([{ ...product, quantity: 1, isChecked: true }]);
  });

  test('does not add product to cart if already in cart', () => {
    localStorage.setItem('cart', JSON.stringify([{ ...product, quantity: 1, isChecked: true }]));

    render(
      <Router>
        <ProductCard product={product} updateCartCount={mockUpdateCartCount} />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));
    const cart = JSON.parse(localStorage.getItem('cart'));
    expect(cart).toEqual([{ ...product, quantity: 1, isChecked: true }]);
  });

  test('displays "Sin stock" message when product amount is 0', () => {
    const product = {
      id: 1,
      name: 'Producto de prueba',
      price: 25.50,
      image: 'https://dummyimage.com/600x400/000/fff',
      amount: 0,
    };
    localStorage.setItem('cart', JSON.stringify([product]));

    render(<ProductCard product={product} updateCartCount={mockUpdateCartCount}/>);

    expect(screen.getByText('Sin stock')).toBeInTheDocument();
  });

});
