import { Form, Button } from "react-bootstrap";

const QuantityControl = ({ quantity, handleIncrease, handleDecrease }) => {
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
            onClick={handleIncrease}>
            +
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default QuantityControl;
