import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ClassSettings = () => {
  const { setActive, name, description } = useOutletContext();
  useEffect(() => {
    setActive('Settings');
  });

  return (
    <Container fluid>
      <h4>Information</h4>
      <hr className="mt-0" />

      <Row className="mb-3">
        <Col lg={2} md={4} sm={6} className="text-break">
          <h6>Name</h6>
        </Col>
        <Col lg={10} md={8} sm={6}>
          {name}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={2} md={4} sm={6} className="text-break">
          <h6>Description</h6>
        </Col>
        <Col lg={10} md={8} sm={6}>
          {description}
        </Col>
      </Row>

      <h4>Actions</h4>
      <hr className="mt-0" />

      <Row className="align-items-center mb-3 border rounded p-2">
        <Col lg={3} className="text-break">
          <h6>Archive</h6>
          <p className="text-muted m-0">Mark this class as read only</p>
        </Col>
        <Col lg={9}>
          <Button variant="secondary">Archive</Button>
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
          <Button variant="danger">Delete</Button>
        </Col>
      </Row>
    </Container>
  );
};
export default ClassSettings;
