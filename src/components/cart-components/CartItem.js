import { useContext } from "react";
import { Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import QuantityControl from "../QuantityControl";
import { CartContext } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);

  const handleCheckboxChange = () => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { ...item, isChecked: !item.isChecked },
    });
  };

  const handleIncrease = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: item.quantity + 1 },
    });
  };

  const handleDecrease = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: item.quantity - 1 },
    });
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: item.id } });
  };

  return (
    <Card className='mb-3'>
      <Card.Body className='d-flex flex-column flex-md-row  gap-4'>
        <div className='d-flex '>
          <input
            type='checkbox'
            checked={item.isChecked}
            onChange={handleCheckboxChange}
            className='c-mr-10'
          />
          <img
            src={item.image}
            alt={item.name}
            className='c-mr-15 c-with-100'
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className='flex-grow-1 c-texta-left'>
          <h5>{item.name}</h5>
          <p>Precio: S/{item.price.toFixed(2)}</p>
          <div style={{ width: "15rem" }}>
            <QuantityControl
              quantity={item.quantity}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              className='c-with-100'
            />
          </div>
        </div>
        <div className='d-flex flex-column align-items-end gap-2'>
          <FaTrash
            onClick={handleRemove}
            className='trash-custom'
            data-testid='remove-button'
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
