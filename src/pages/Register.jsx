import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { register } from '../utils/userAPI';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/classes');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    occupation: 'occupation',
    fname: '',
    lname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { occupation, fname, lname, email, password, passwordConfirm } =
    formData;

  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register({
      role: occupation,
      fname,
      lname,
      email,
      password,
    }).then((response) => {
      dispatch({
        type: 'LOGIN',
        payload: response.data,
      });
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          className="mx-auto px-3 px-sm-5 my-3 my-sm-4"
          style={{ maxWidth: '576px' }}
        >
          <h2 className="text-center mb-3">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              id="select-occupation"
              name="occupation"
              value={occupation}
              onChange={handleInputChange}
              className="mb-3"
              aria-label="Select Occupation"
              required
            >
              <option value="occupation" disabled>
                Occupation
              </option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Form.Select>

            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingFnameInput"
                  label="First Name"
                  className="mb-3"
                  name="firstname"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
                    name="fname"
                    value={fname}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingLnameInput"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lname"
                    value={lname}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel
              controlId="floatingEmailInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email address"
                required
                name="email"
                value={email}
                onChange={handleInputChange}
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
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPasswordConfirmInput"
              label="Confirm password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handleInputChange}
                required
                autocomplete="new-password"
              />
            </FloatingLabel>

            <div className="d-flex justify-content-center px-5">
              <Button variant="info" type="submit" className="w-50">
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
