
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { CartContext } from '../context/CartContext';
import ProductList from '../pages/ProductList';
import getProducts from '../hooks/useGetProducts';
import addProducts from '../hooks/usePostProducts';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../context/ThemeContext';

jest.mock('../hooks/useGetProducts');
jest.mock('../hooks/usePostProducts');
jest.mock('../components/Loader', () => () => <div>Loading...</div>);
jest.mock('../components/modals/ModalAddNewProduct', () => ({ show, handleClose, onAddProduct }) => (
  show ? <div data-testid="modal">Modal</div> : null
));

const RouterWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );
};

describe('ProductList Component', () => {
  const products = [{ id: 1, name: 'Product 1', price: 3 }, { id: 2, name: 'Product 2', price: 3 }];
  const dispatch = jest.fn();
  const state = { products: [] };

  beforeEach(() => {
    dispatch.mockClear();
    getProducts.mockClear();
    addProducts.mockClear();
    localStorage.clear();
  });

  const customRender = (ui, options) =>
    render(ui, { wrapper: RouterWrapper, ...options });

  test('renders loading spinner initially', () => {
    customRender(
      <ThemeProvider>
        <CartContext.Provider value={{ state, dispatch }}>
          <ProductList />
        </CartContext.Provider>
      </ThemeProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    const errorMessage = 'Failed to fetch products';
    getProducts.mockRejectedValueOnce(new Error(errorMessage));

    customRender(
      <ThemeProvider>
        <CartContext.Provider value={{ state: { products: [] }, dispatch }}>
          <ProductList />
        </CartContext.Provider>
      </ThemeProvider>
    );

    await screen.findByText(`Error: ${errorMessage}`);
  });

  test('renders products after successful fetch', async () => {
    const newProduct = { id: 3, name: 'Product 3', price: 5 };
    getProducts.mockResolvedValueOnce(products);
    addProducts.mockResolvedValueOnce(newProduct);
  
    customRender(
      <ThemeProvider>
        <CartContext.Provider value={{ state: { products }, dispatch }}>
          <ProductList />
        </CartContext.Provider>
      </ThemeProvider>
    );
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('shows modal when "Agregar Producto" button is clicked', () => {
    customRender(
      <ThemeProvider>
        <CartContext.Provider value={{ state: { products }, dispatch }}>
          <ProductList />
        </CartContext.Provider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Agregar Producto'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });


  test('updates cart count when a product is added to cart', async () => {
    const product = { id: 1, name: 'Product 1', price: 3, quantity: 1, isChecked: true };
    getProducts.mockResolvedValueOnce(products);

    customRender(
      <ThemeProvider>
        <CartContext.Provider value={{ state: { products }, dispatch }}>
          <ProductList />
        </CartContext.Provider>
      </ThemeProvider>
    );

    const productCard = screen.getByText('Product 1').closest('.product-card');
    const buyButton = within(productCard).getByText('Comprar');
    fireEvent.click(buyButton);
    await waitFor(() => {
      expect(localStorage.getItem('cart')).toEqual(JSON.stringify([product]));
      
    });
    expect(screen.getByText('1')).toBeInTheDocument();
  });


});
