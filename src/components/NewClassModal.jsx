import { createPortal } from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NewClassModal = ({ show, handleClose }) => {
  const ModalContainer = (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Class</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info">Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  return createPortal(ModalContainer, document.getElementById('modal-root'));
};
export default NewClassModal;
