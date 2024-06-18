import { useState, useEffect } from "react";
import { Modal, Button} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import QuantityControl from "../QuantityControl";
import "../../assets/scss/Modal.scss";
import { useTheme } from "../../context/ThemeContext";

const ProductModal = ({ product, show, onHide, updateCartCount }) => {
  const [quantity, setQuantity] = useState(1);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const cartFromStorage = localStorage.getItem("cart");
    let cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setQuantity(existingItem.quantity);
    }
  }, [product.id]);

  const updateCart = (newQuantity) => {
    const cartFromStorage = localStorage.getItem("cart");
    let cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = newQuantity;
    } else {
      cart.push({ ...product, quantity: newQuantity, isChecked: true });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    updateCart(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCart(quantity - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className={isDarkMode ? 'dark-mode' : ''}>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex'>
        <img src={product.image} alt={product.name} className='modal-image' />
        <div className='mt-5  c-ml-10'>
          <p>Precio: ${product.price.toFixed(2)}</p>
          <QuantityControl
            quantity={quantity}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' as={NavLink} to='/products/cart'>
          Ir al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
