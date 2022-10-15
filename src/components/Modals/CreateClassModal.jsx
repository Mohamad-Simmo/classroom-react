import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const CreateClassModal = ({ show, handleClose }) => {
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

  const handleCreate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 5000);
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
      <Modal.Body>
        <Form autoComplete="off">
          <Form.Group className="mb-3" controlId="Form.className">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class name"
              autoFocus
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="info" onClick={handleCreate} disabled={isLoading}>
          {isLoading && (
            <Spinner animation="border" size="sm" className="me-1" />
          )}
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateClassModal;
