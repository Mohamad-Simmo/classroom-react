import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { createClass } from '../../utils/classAPI';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const CreateClassModal = ({ show, handleClose, addClass }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: '',
      description: '',
    });
    setIsLoading(false);
  }, [handleClose]);

  const { name, description } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createClass(user.token, formData)
      .then(({ data }) => {
        addClass(data);
      })
      .then(() => {
        setIsLoading(false);
        handleClose();
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
        <Modal.Title>Create Class</Modal.Title>
      </Modal.Header>
      <Form autoComplete="off" onSubmit={handleCreate}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="Form.className">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class name"
              autoFocus
              required
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Form.classDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter class description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="info" disabled={isLoading}>
            {isLoading && (
              <Spinner animation="border" size="sm" className="me-1" />
            )}
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default CreateClassModal;
