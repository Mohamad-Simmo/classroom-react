import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { joinClass } from '../../utils/peopleAPI';
import AuthContext from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom';

const JoinClassModal = ({ show, handleClose }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const { updateClasses } = useOutletContext();

  useEffect(() => {
    setCode('');
    setError('');
    setIsLoading(false);
  }, [handleClose]);

  const handleChange = (e) => setCode(e.target.value);

  const handleJoin = () => {
    setIsLoading(true);
    joinClass(user.token, code)
      .then(() => {
        setIsLoading(false);
        updateClasses();
        handleClose();
      })
      .catch(() => {
        setIsLoading(false);
        setError('Invalid class code');
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered={true}
    >
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>Join Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off">
          <Form.Group as={Row} className="mb-3" controlId="Form.className">
            <Form.Label column sm={3}>
              Class Code
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Enter class code"
                autoFocus
                name="code"
                value={code}
                className={`${error && 'is-invalid'}`}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Invalid code
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="dark" onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="info" onClick={handleJoin} disabled={isLoading}>
          {isLoading && (
            <Spinner animation="border" size="sm" className="me-1" />
          )}
          Join
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default JoinClassModal;
