import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../assets/scss/CartSummary.scss";

const CartSummary = ({ totalItems, totalPrice }) => {
  return (
    <div className='cart-summary'>
      <Card className='text-right'>
        <Card.Body className='flex-wrap'>
          <div className='d-flex justify-content-between align-items-center flex-wrap'>
            <p>Productos: {totalItems}</p>
            <p>Total: S/ {totalPrice.toFixed(2)}</p>
          </div>
          <Button variant='success' className='w-100'>
            Proceder al Pago
          </Button>
        </Card.Body>
      </Card>

      <Button className='w-100' variant='primary' as={NavLink} to='/products'>
        Seguir comprando
      </Button>
    </div>
  );
};

export default CartSummary;
