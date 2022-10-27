import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole } from '../../utils/userAPI';
import { getClasses } from '../../utils/classAPI';
import AuthContext from '../../context/AuthContext';

const ClassesContainer = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setIsLoading(true);
      getRole(user.token).then((response) => {
        dispatch({
          type: 'ROLE',
          payload: response.data.role,
        });
      });

      getClasses(user.token)
        .then((response) => {
          setClasses(response.data);
        })
        .then(() => setIsLoading(false));
    }
  }, [user, navigate, dispatch]);

  const addClass = (newClass) => {
    setClasses((prev) => [...prev, newClass]);
  };

  return (
    <Container
      className="py-3"
      fluid="lg"
      style={{
        height: 'calc(100% - 66px)',
      }}
    >
      <Outlet context={{ classes, addClass, isLoading }} />
    </Container>
  );
};
export default ClassesContainer;
