import AuthContext from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import ClassCard from '../components/ClassCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getRole } from '../utils/userAPI';
import { getClasses } from '../utils/classAPI';
import NewClassModal from '../components/NewClassModal';

const Home = () => {
  const { user, role, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      getRole(user.token).then((response) => {
        dispatch({
          type: 'ROLE',
          payload: response.data.role,
        });
      });

      getClasses(user.token).then((response) => {
        setClasses(response.data);
      });
    }
  }, [user, navigate, dispatch]);

  return (
    <>
      <NewClassModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <Container className="py-3">
        <Stack
          direction="horizontal"
          className="border-bottom border-3 border-dark"
        >
          <h2 className="">Classes</h2>
          {role && (
            <Stack direction="horizontal" gap={2} className="ms-auto mb-2">
              <Button
                variant={role === 'teacher' ? 'outline-dark' : 'info'}
                className="rounded-5"
                onClick={handleShow}
              >
                Join Class
              </Button>
              {role === 'teacher' && (
                <Button variant="info" className="rounded-5">
                  Create Class
                </Button>
              )}
            </Stack>
          )}
        </Stack>
        {classes.length === 0 ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              height: '300px',
            }}
          >
            <h6 className="text-muted">Add a new class to get started</h6>
          </div>
        ) : (
          <Row>
            {classes.map((_class) => {
              const { full_name, id, name, description, code, num_people } =
                _class;
              return (
                <Col xs={12} md={6} lg={4} className="p-3">
                  <ClassCard
                    key={id}
                    id={id}
                    instructor={full_name}
                    title={name}
                    description={description}
                    code={code}
                    people={num_people}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};
export default Home;
