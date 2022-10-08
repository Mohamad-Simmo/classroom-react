import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Register = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          className="mx-auto py-3 px-3 px-sm-5 my-3 my-sm-5"
          style={{ maxWidth: '576px' }}
        >
          <h2 className="text-center mb-3">Register</h2>
          <Form>
            <FloatingLabel
              controlId="floatingEmailInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="Email address" required />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPasswordInput"
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" placeholder="Password" required />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPasswordConfirmInput"
              label="Confirm password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Confirm password"
                required
              />
            </FloatingLabel>

            <div className="d-flex justify-content-center px-5">
              <Button variant="primary" type="submit" className="w-50">
                REGISTER
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Register;
