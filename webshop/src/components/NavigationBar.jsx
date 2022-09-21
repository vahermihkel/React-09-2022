import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavigationBar() {
  return ( 
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="admin">Admin</Nav.Link>
            <Nav.Link as={Link} to="cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="about-us">About us</Nav.Link>
            <Nav.Link as={Link} to="shops">Shops</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   );
}

export default NavigationBar;