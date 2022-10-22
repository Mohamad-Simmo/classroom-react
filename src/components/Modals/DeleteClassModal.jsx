import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom';
import { deleteClass } from '../../utils/classAPI';
import { useNavigate } from 'react-router-dom';

const DeleteClassModal = ({ show, handleClose }) => {
  const { user } = useContext(AuthContext);
  const { id } = useOutletContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteClass(user.token, {
      id: id,
    }).then(() => {
      handleClose();
      navigate('/classes');
    });
  };

  return (
    <Modal size="sm" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Delete Class</Modal.Title>
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
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
export default DeleteClassModal;
