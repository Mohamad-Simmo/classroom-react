import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BsNavbar } from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { BiLogIn } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <BsNavbar bg="dark" variant="dark" expand="sm">
      <Container>
        <LinkContainer to="/">
          <BsNavbar.Brand className="fs-4">Classroom</BsNavbar.Brand>
        </LinkContainer>
        <BsNavbar.Toggle aria-controls="navbar-nav-collapse" />
        <BsNavbar.Collapse id="navbar-nav-collapse">
          <Nav className="ms-auto gap-3">
            <LinkContainer to="/login">
              <Nav.Link className="p-3 fs-5 d-flex gap-2 align-items-center">
                <BiLogIn />
                Login
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link className="p-3 fs-5 d-flex gap-2 align-items-center">
                <IoCreateOutline />
                Register
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};
export default Navbar;
