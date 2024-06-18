import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../assets/scss/Modal.scss";
import { useTheme } from "../../context/ThemeContext";

const AddProductModal = ({ show, handleClose, onAddProduct }) => {
  const { isDarkMode } = useTheme();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const price = parseFloat(productPrice);
    const newProduct = {
      name: productName,
      amount: +productDescription,
      price: price,
      image: URL.createObjectURL(productImage),
    };

    onAddProduct(newProduct);

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImage(null);
    handleClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  return (
    <Modal
      data-testid='modal'
      show={show}
      onHide={handleClose}
      className={isDarkMode ? "dark-mode" : ""}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='productName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId='productAmount'>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type='number'
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId='productPrice'>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type='number'
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId='productImage'>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type='file'
              accept='.jpg, .jpeg, .png'
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            data-testid='guardar-prod'
            className='c-mt-20'>
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
