import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import { deleteForm } from '../../utils/formAPI';

const DeleteFormModal = ({ setForms, show, setShow, data: { id, title } }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    deleteForm(user.token, id).then(() => {
      setForms((prev) => prev.filter((form) => id !== form.id));
      handleClose();
    });
  };

  const handleClose = () => setShow('');

  return (
    <Modal size="sm" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Delete {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Button variant="dark" onClick={handleClose} className="w-100">
              Cancel
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handleDelete} className="w-100">
              Delete
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
export default DeleteFormModal;
