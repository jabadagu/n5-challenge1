import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "../context/CartContext";
import Cart from "../pages/Cart";
import "@testing-library/jest-dom/extend-expect";

// Mock components
jest.mock("../components/cart-components/CartItem", () => () => <div>Mocked CartItem</div>);
jest.mock("../components/cart-components/CartSummary", () => () => <div>Mocked CartSummary</div>);
jest.mock("../components/cart-components/EmptyCart", () => () => <div>Mocked EmptyCart</div>);

const renderCart = (stateValue) => {
  const dispatch = jest.fn();
  render(
    <CartContext.Provider value={{ state: stateValue, dispatch }}>
      <Cart />
    </CartContext.Provider>
  );
  return { dispatch };
};

describe("Cart component", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("loads cart from localStorage on mount", () => {
    const cartItems = [{ id: 1, name: "Item 1", quantity: 1, price: 10, isChecked: true }];
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    const { dispatch } = renderCart({ cart: [] });

    expect(dispatch).toHaveBeenCalledWith({
      type: "LOAD_CART",
      payload: cartItems,
    });
  });

  test("displays empty cart message when cart is empty", () => {
    renderCart({ cart: [] });

    expect(screen.getByText("Mocked EmptyCart")).toBeInTheDocument();
  });

  test("displays cart items when cart is not empty", () => {
    const stateValue = { cart: [{ id: 1, name: "Item 1", quantity: 1, price: 10, isChecked: true }] };
    renderCart(stateValue);

    expect(screen.getByText("Mocked CartItem")).toBeInTheDocument();
  });

  test("displays the correct total items and total price", () => {
    const stateValue = { 
      cart: [
        { id: 1, name: "Item 1", quantity: 1, price: 10, isChecked: true },
        { id: 2, name: "Item 2", quantity: 2, price: 20, isChecked: false },
        { id: 3, name: "Item 3", quantity: 3, price: 30, isChecked: true }
      ] 
    };
    renderCart(stateValue);

    expect(screen.getByText("Mocked CartSummary")).toBeInTheDocument();
  });

  test("clears the cart when 'Limpiar' button is clicked", () => {
    const stateValue = { cart: [{ id: 1, name: "Item 1", quantity: 1, price: 10, isChecked: true }] };
    const { dispatch } = renderCart(stateValue);

    fireEvent.click(screen.getByText("Limpiar"));

    expect(dispatch).toHaveBeenCalledWith({ type: "CLEAR_CART" });
  });

  test("does not display 'Limpiar' button when cart is empty", () => {
    renderCart({ cart: [] });

    expect(screen.queryByText("Limpiar")).not.toBeInTheDocument();
  });

  test("displays 'Limpiar' button when cart has items", () => {
    const stateValue = { cart: [{ id: 1, name: "Item 1", quantity: 1, price: 10, isChecked: true }] };
    renderCart(stateValue);

    expect(screen.getByText("Limpiar")).toBeInTheDocument();
  });
});
