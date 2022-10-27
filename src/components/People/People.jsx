import { useOutletContext } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { getPeople, addPeople } from '../../utils/peopleAPI';
import AuthContext from '../../context/AuthContext';

const People = () => {
  const { setActive, id } = useOutletContext();
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState('');
  const [people, setPeople] = useState([]);
  useEffect(() => {
    setActive('People');

    getPeople(user.token, id).then(({ data }) => setPeople(data));
  }, [setActive, id, user.token]);

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPeople(user.token, { class_id: id, emails: value }).then(() =>
      getPeople(user.token, id).then(({ data }) => setPeople(data))
    );
  };
  return (
    <>
      <Accordion className="accordion-post mb-3">
        <Accordion.Item eventKey={1}>
          <Accordion.Button>Add People</Accordion.Button>
          <Accordion.Body>
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
                />
              </Form.Group>
              <Stack
                direction="horizontal"
                gap={2}
                className="justify-content-end"
              >
                <Button type="reset" variant="dark">
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
