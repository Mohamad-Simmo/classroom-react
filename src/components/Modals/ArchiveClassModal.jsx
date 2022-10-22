import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom';
import { archiveClass } from '../../utils/classAPI';
import { useNavigate } from 'react-router-dom';

const ArchiveClassModal = ({ show, handleClose }) => {
  const { user } = useContext(AuthContext);
  const { id, isArchived } = useOutletContext();
  const navigate = useNavigate();

  const handleArchive = () => {
    archiveClass(user.token, {
      id: id,
      archived: !isArchived,
    }).then(() => {
      if (isArchived) {
        navigate('/classes');
      } else {
        navigate('/classes/archived');
      }
    });
  };

  return (
    <Modal size="sm" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{isArchived ? 'Unarchive' : 'Archive'} Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Button variant="dark" onClick={handleClose} className="w-100">
              Cancel
            </Button>
          </Col>
          <Col>
            <Button variant="info" onClick={handleArchive} className="w-100">
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
export default ArchiveClassModal;
