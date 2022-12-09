import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Container } from 'react-bootstrap';
import { getClasses } from '../../utils/classAPI';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (user) {
      getClasses(user.token).then((response) => {
        setClasses(response.data);
      });
    }
  }, [user, navigate, dispatch]);

  return (
    <>
      <Navbar />
      {/* <ToastContainer position="bottom-end" className="position-fixed p-3">
        <Toast>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>See? Just like this.</Toast.Body>
        </Toast>
        <Toast>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">2 seconds ago</small>
          </Toast.Header>
          <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
        </Toast>
      </ToastContainer> */}
      <Container
        className="py-4"
        fluid="lg"
        style={{
          height: 'calc(100% - 66px)',
        }}
      >
        <Outlet context={{ classes }} />
      </Container>
    </>
  );
};
export default Index;
