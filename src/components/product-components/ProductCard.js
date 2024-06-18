import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../../assets/scss/Product.scss";
import ModalProductModal from "../modals/ModalAddProductToCart";

const ProductCard = ({ product, updateCartCount }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    const cartFromStorage = localStorage.getItem("cart");
    let cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex === -1) {
      const newItem = { ...product, quantity: 1, isChecked: true };
      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCartCount();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='product-card'>
      <Card>
        <Card.Img variant='top' src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Precio: ${product.price.toFixed(2)}</Card.Text>
          {product.amount === 0 && (
            <span className='out-of-stock'>Sin stock</span>
          )}
          <Button
            variant='primary'
            onClick={handleShowModal}
            disabled={product.amount === 0}
            data-testid='buy-button'
            >
            Comprar
          </Button>
        </Card.Body>
      </Card>

      <ModalProductModal
        product={product}
        show={showModal}
        onHide={handleCloseModal}
        updateCartCount={updateCartCount}
      />
    </div>
  );
};

export default ProductCard;
