import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import { Container } from 'react-bootstrap';
import { getClasses } from '../../utils/classAPI';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (user) {
      getClasses(user.token).then((response) => {
        setClasses(response.data);
      });
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />

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
