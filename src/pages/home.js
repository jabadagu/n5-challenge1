import "../assets/scss/Banner.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import home from "../assets/img/home.webp";

const Home = () => {
  return (
    <div className='banner'>
      <Container>
        <Row className='align-items-center'>
          <Col md={6} className='text-center text-md-left'>
            <h1 className='banner-title'>Bienvenido a MyStore</h1>
            <p className='banner-subtitle'>
              Vas a encontrar diversos tipos de abarrotes para el hogar
            </p>
            <Button variant='primary' size='lg' as={NavLink} to='/products'>
              Ir a comprar
            </Button>
          </Col>
          <Col md={6} className='text-center'>
            <img src={home} alt='Banner' className='banner-image' />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
