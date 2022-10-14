import { createPortal } from 'react-dom';
import Button from 'react-bootstrap/Button';
import { default as BsModal } from 'react-bootstrap/Modal';
import { useReducer } from 'react';

const initialState = {
  title: '',
  body: null,
  footer: null,
  show: false,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, show: !state.show };
    default:
      return state;
  }
};

export const modalService = {
  show: () => {
    dispatch({
      type: 'TOGGLE',
    });
  },
};

const Modal = () => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { title, body, footer, show } = state;

  const handleClose = () => {};

  const handleShow = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };
  const ModalContainer = (
    <>
      <BsModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <BsModal.Header closeButton>
          <BsModal.Title>{title}</BsModal.Title>
        </BsModal.Header>
        <BsModal.Body>{body}</BsModal.Body>
        <BsModal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info">Create</Button>
        </BsModal.Footer>
      </BsModal>
    </>
  );

  return createPortal(ModalContainer, document.getElementById('modal-root'));
};
export default Modal;
