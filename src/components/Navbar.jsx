import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BsNavbar } from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GiBookmarklet } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Avatar from './UI/Avatar';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  };
  return (
    <BsNavbar bg="dark" variant="dark" expand={false}>
      <Container
        fluid
        className="d-flex justify-content-start align-items-center gap-4"
      >
        <BsNavbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
        <BsNavbar.Brand
          as={Link}
          to="classes"
          className="d-flex gap-3 align-items-center"
        >
          <GiBookmarklet style={{ fontSize: '40px' }} />
          Classroom
        </BsNavbar.Brand>
        <BsNavbar.Offcanvas
          id={`offcanvasNavbar-expand-false`}
          aria-labelledby={`offcanvasNavbarLabel-expand-false`}
          placement="start"
          className="text-bg-dark offcanvas-size-sm"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
              <BsNavbar.Brand
                as={Link}
                to="classes"
                className="d-flex gap-3 align-items-center"
              >
                <GiBookmarklet style={{ fontSize: '40px' }} />
                Classroom
              </BsNavbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link>Classes</Nav.Link>
              <Nav.Link>Archived</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </BsNavbar.Offcanvas>
        <Avatar margin={'ms-auto'} />
      </Container>
    </BsNavbar>
  );
};
export default Navbar;
