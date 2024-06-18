import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const EmptyCart = () => {
  return (
    <Container >
      <Card className="text-center p-4">
        <Card.Body>
          <Card.Title>¡Tu carrito está vacío!</Card.Title>
          <Card.Text>
            Parece que no has añadido ningún producto al carrito todavía.
          </Card.Text>
          <Link to='/products'>
            <Button variant='primary'>Ver Productos</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmptyCart;
