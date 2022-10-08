import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useRef } from 'react';
import { login } from '../utils/userAPI';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
    }
    setValidated(true);
  };

  const handleBlur = (e) => {
    setValidated(true);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          className="mx-auto py-3 px-3 px-sm-5 my-3 my-sm-5"
          style={{ maxWidth: '576px' }}
        >
          <h2 className="text-center mb-3">Login</h2>
          <Form
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
            onBlur={handleBlur}
          >
            <FloatingLabel
              controlId="floatingEmailInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Email address"
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPasswordInput"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </FloatingLabel>

            <div className="d-flex justify-content-center px-5">
              <Button variant="primary" type="submit" className="w-50">
                LOGIN
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
