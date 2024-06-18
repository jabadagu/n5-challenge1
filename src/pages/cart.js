import { useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CartItem from "../components/cart-components/CartItem";
import CartSummary from "../components/cart-components/CartSummary";
import EmptyCart from "../components/cart-components/EmptyCart";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "LOAD_CART", payload: cart });
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalItems =
    state.cart.length &&
    state.cart.reduce(
      (total, item) => (item.isChecked ? total + item.quantity : total),
      0
    );

  const totalPrice =
    state.cart.length &&
    state.cart.reduce(
      (total, item) =>
        item.isChecked ? total + item.price * item.quantity : total,
      0
    );

  return (
    <Container>
      <Row className='c-mb-150'>
        <Col md={8}>
          <div className='d-flex align-items-center c-mb-10'>
            <h4 style={{ padding: "10px" }}>Carrito de Compras</h4>
            {totalItems > 0 && (
              <Button
                data-testid='clear-button'
                className='c-ml-auto'
                variant='danger'
                onClick={handleClearCart}>
                Limpiar
              </Button>
            )}
          </div>
          {state.cart.length ? (
            state.cart.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <EmptyCart />
          )}
        </Col>
        <Col md={4}>
          <h4 className='d-none d-md-block ' style={{ padding: "15px" }}>
            Resumen del Pedido
          </h4>
          <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
