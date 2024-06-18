import { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  products: [],
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    case "REMOVE_FROM_CART":
      const remainingCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(remainingCart));
      return { ...state, cart: remainingCart };
    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { ...state, cart: [] };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "LOAD_CART":
      return { ...state, cart: action.payload };
    case "UPDATE_ITEM":
      const updatedItems = state.cart.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { ...state, cart: updatedItems };
    case "UPDATE_QUANTITY":
      const updatedQuantity = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedQuantity));
      return { ...state, cart: updatedQuantity };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cartFromStorage = localStorage.getItem("cart");
    const cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    dispatch({ type: "LOAD_CART", payload: cart });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
