import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { login } from '../utils/userAPI';

const Login = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/classes');
    }
  }, [user, navigate]);

  const resetFormData = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prevData) => ({ ...prevData, [name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      password,
    })
      .then((response) => {
        dispatch({
          type: 'LOGIN',
          payload: response.data,
        });
      })
      .catch((error) => {
        resetFormData();
        setError(error.response.data.message);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          className="mx-auto py-3 px-3 px-sm-5 my-3 my-sm-5"
          style={{ maxWidth: '576px' }}
        >
          <h2 className="text-center mb-3">Login</h2>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingEmailInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email address"
                name="email"
                value={email}
                onChange={handleInputChange}
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
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>

            <Stack className="align-items-center">
              <Button variant="info" type="submit" className="w-50">
                LOGIN
              </Button>
              {error && <p className="text-danger mt-2 fw-bold">{error}</p>}
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
