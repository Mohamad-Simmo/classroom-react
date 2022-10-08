import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BsNavbar } from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/login');
  };
  return (
    <BsNavbar bg="dark" variant="dark" expand="sm">
      <Container>
        <LinkContainer to="/">
          <BsNavbar.Brand className="fs-4">Classroom</BsNavbar.Brand>
        </LinkContainer>
        <BsNavbar.Toggle aria-controls="navbar-nav-collapse" />
        <BsNavbar.Collapse id="navbar-nav-collapse">
          <Nav className="ms-auto gap-3">
            {!user && (
              <>
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
              </>
            )}
            {user && (
              <div onClick={handleLogout}>
                <Nav.Link className="p-3 fs-5 d-flex gap-2 align-items-center">
                  <BiLogOut />
                  Logout
                </Nav.Link>
              </div>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};
export default Navbar;
