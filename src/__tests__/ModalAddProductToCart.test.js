import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "../context/ThemeContext";
import ProductModal from "../components/modals/ModalAddProductToCart";


jest.mock("../components/QuantityControl.js", () => ({ quantity, handleIncrease, handleDecrease }) => (
  <div>
    <button onClick={handleDecrease}>-</button>
    <span>{quantity}</span>
    <button onClick={handleIncrease}>+</button>
  </div>
));

const product = {
  id: 1,
  name: "Product 1",
  price: 10.0,
  image: "http://example.com/product1.jpg",
};

describe("ProductModal component", () => {
  test("renders ProductModal component correctly", () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <ProductModal product={product} show={true} onHide={jest.fn()} updateCartCount={jest.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Precio: $10.00")).toBeInTheDocument();
    expect(screen.getByAltText("Product 1")).toBeInTheDocument();
  });

  test("increments and decrements quantity correctly", () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <ProductModal product={product} show={true} onHide={jest.fn()} updateCartCount={jest.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");
    const quantityDisplay = screen.getByText("1");

    fireEvent.click(incrementButton);
    expect(quantityDisplay).toHaveTextContent("2");

    fireEvent.click(decrementButton);
    expect(quantityDisplay).toHaveTextContent("1");
  });

  test("navigates to cart page when 'Ir al carrito' button is clicked", () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <ProductModal product={product} show={true} onHide={jest.fn()} updateCartCount={jest.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const cartButton = screen.getByText("Ir al carrito");
    fireEvent.click(cartButton);

    expect(window.location.pathname).toBe("/products/cart");
  });

});
