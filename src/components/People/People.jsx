import { useOutletContext } from 'react-router-dom';
import { useEffect, useContext, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { getPeople, addPeople } from '../../utils/peopleAPI';
import AuthContext from '../../context/AuthContext';
import { Alert } from 'react-bootstrap';

const People = () => {
  const { setActive, id, isArchived } = useOutletContext();
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState('');
  const [people, setPeople] = useState([]);
  const accordRef = useRef();
  const [alert, showAlert] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    setActive('People');

    getPeople(user.token, id).then(({ data }) => setPeople(data));
  }, [setActive, id, user.token]);

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanValue = value.replaceAll(' ', '').replaceAll('\n', '');

    addPeople(user.token, { class_id: id, emails: cleanValue }).then(
      ({ data }) => {
        setResponse(data);
        showAlert(true);
        getPeople(user.token, id).then(({ data }) => setPeople(data));
      }
    );
    setValue('');
  };
  return (
    <>
      {!isArchived && user.role === 'teacher' && (
        <Accordion className="accordion-post mb-3">
          <Accordion.Item eventKey={1}>
            <Accordion.Button ref={accordRef}>Add People</Accordion.Button>
            <Accordion.Body className="px-3 py-2">
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email Addresses</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Comma-separated Emails"
                    value={value}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="justify-content-end"
                >
                  <Button
                    onClick={() => {
                      accordRef.current.click();
                      setValue('');
                    }}
                    type="reset"
                    variant="dark"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="info">
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}

      <Alert
        variant="dark"
        show={alert}
        onClose={() => showAlert(false)}
        dismissible
      >
        {Object.keys(response).map((email, idx) => (
          <p
            className={`p-0 m-0 ${
              response[email] ? 'text-success' : 'text-danger'
            }`}
            key={idx}
          >
            {response[email] && 'Added: ' + email}
            {!response[email] && 'Failed to add: ' + email}
          </p>
        ))}
      </Alert>

      <Table hover responsive variant="white">
        <thead className="text-bg-dark">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{person.fname}</td>
              <td>{person.lname}</td>
              <td>{person.email}</td>
              <td>{person.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default People;
