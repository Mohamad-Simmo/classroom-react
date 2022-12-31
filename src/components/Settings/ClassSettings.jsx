import { useEffect, useState, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { updateClass } from '../../utils/classAPI';
import AuthContext from '../../context/AuthContext';
import DeleteClassModal from '../Modals/DeleteClassModal';
import ArchiveClassModal from '../Modals/ArchiveClassModal';

const ClassSettings = () => {
  const { user } = useContext(AuthContext);
  const { setActive, code, name, description, id, setClassData, isArchived } =
    useOutletContext();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [modal, setModal] = useState('');

  const handleClose = () => setModal('');
  const handleShow = (e) => setModal(e.target.dataset.modal);

  useEffect(() => {
    setActive('Settings');
  }, [setActive]);

  useEffect(() => {
    setFormData({ name: name, description: description });
  }, [name, description]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    setEdit(false);
    setFormData({ name: name, description: description });
  };

  const handleSave = () => {
    updateClass(user.token, {
      ...formData,
      id,
    })
      .then(() => {
        setEdit(false);
        setClassData((prev) => ({ ...prev, ...formData }));
      })
      .catch(() => handleCancel());
  };

  return (
    <>
      <ArchiveClassModal show={modal === 'archive'} handleClose={handleClose} />
      <DeleteClassModal show={modal === 'delete'} handleClose={handleClose} />
      <Container fluid>
        <Stack direction="horizontal" className="mb-1">
          <h4>Information</h4>
          {!edit && (
            <Button
              variant="secondary"
              className="ms-auto"
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </Stack>
        <hr className="mt-0" />

        <Row className="mb-3">
          <Col lg={2} md={4} sm={6} className="text-break">
            <h6 className="m-0">Name</h6>
          </Col>
          <Col lg={10} md={8} sm={6}>
            {edit ? (
              <Form.Control
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
              />
            ) : (
              name
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={2} md={4} sm={6} className="text-break">
            <h6 className="m-0">Description</h6>
          </Col>
          <Col lg={10} md={8} sm={6}>
            {edit ? (
              <Form.Control
                type="text"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
              />
            ) : (
              description
            )}
          </Col>
        </Row>
        {user.role === 'teacher' && (
          <Row className="mb-3">
            <Col lg={2} md={4} sm={6} className="text-break">
              <h6 className="m-0">Code</h6>
            </Col>
            <Col lg={10} md={8} sm={6}>
              {code}
            </Col>
          </Row>
        )}
        {edit && (
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-end mb-2"
          >
            <Button variant="dark" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="info" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        )}

        <h4>Actions</h4>
        <hr className="mt-0" />

        <Row className="align-items-center mb-3 border rounded p-2">
          <Col lg={3} className="text-break">
            <h6>Archive</h6>
            <p className="text-muted m-0">Mark this class as read only</p>
          </Col>
          <Col lg={9}>
            <Button
              variant="secondary"
              data-modal="archive"
              onClick={handleShow}
            >
              {isArchived ? 'Unarchive' : 'Archive'}
            </Button>
          </Col>
        </Row>

        <Row
          className="align-items-center border rounded p-2 border-danger"
          style={{
            '--bs-border-opacity': 0.5,
          }}
        >
          <Col lg={3} className="text-break">
            <h6>Delete</h6>
            <p className="text-muted m-0">Permanently delete this class</p>
          </Col>
          <Col lg={9}>
            <Button variant="danger" data-modal="delete" onClick={handleShow}>
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ClassSettings;
