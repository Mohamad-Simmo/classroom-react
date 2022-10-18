import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import ClassCard from '../components/UI/ClassCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import CreateClassModal from '../components/Modals/CreateClassModal';
import JoinClassModal from '../components/Modals/JoinClassModal';

const Home = () => {
  const { role } = useContext(AuthContext);
  const { classes, addClass, isLoading } = useOutletContext();
  const [modal, setModal] = useState('');

  const handleClose = () => setModal('');
  const handleShow = (e) => setModal(e.target.dataset.modal);

  return (
    <>
      {role && role === 'teacher' && (
        <CreateClassModal
          addClass={addClass}
          show={modal === 'create'}
          handleClose={handleClose}
        />
      )}
      <JoinClassModal show={modal === 'join'} handleClose={handleClose} />
      <Stack direction="horizontal" className="border-bottom border-dark">
        <h2 className="">Classes</h2>
        {role && (
          <>
            <Stack direction="horizontal" gap={2} className="ms-auto mb-2">
              <Button
                variant={role === 'teacher' ? 'outline-dark' : 'info'}
                className="rounded-5"
                data-modal="join"
                onClick={handleShow}
              >
                Join Class
              </Button>
              {role === 'teacher' && (
                <Button
                  variant="info"
                  className="rounded-5"
                  data-modal="create"
                  onClick={handleShow}
                >
                  Create Class
                </Button>
              )}
            </Stack>
          </>
        )}
      </Stack>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: '400px',
          }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <>
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
                  <Col xs={12} md={6} lg={4} className="p-3" key={id}>
                    <ClassCard
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
        </>
      )}
    </>
  );
};
export default Home;
