import { Form, Button } from "react-bootstrap";

const QuantityControl = ({ quantity, maxQuantity, handleIncrease, handleDecrease }) => {
  const handleIncreaseClick = () => {
    if (quantity < maxQuantity) {
      handleIncrease();
    }
  };

  const handleDecreaseClick = () => {
    if (quantity > 1) {
      handleDecrease();
    }
  };

  return (
    <Form>
      <Form.Group controlId='quantity' className='quantity-control'>
        <span>Cantidad:</span>
        <div className='d-flex align-items-center justify-content-center'>
          <Button
            variant='outline-secondary'
            className='button-custom'
            size='sm'
            onClick={handleDecreaseClick}>
            -
          </Button>
          <Form.Control
            type='number'
            value={quantity}
            readOnly
            className='quantity-input mx-2 text-center'
          />
          <Button
            variant='outline-secondary'
            className='button-custom'
            size='sm'
            onClick={handleIncreaseClick}>
            +
          </Button>
        </div>
        {quantity >= maxQuantity && (
          <small className='text-danger limit-msg'>
            No puedes agregar más de {maxQuantity} unidades.
          </small>
        )}
      </Form.Group>
    </Form>
  );
};

export default QuantityControl;
