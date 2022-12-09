import { useOutletContext } from 'react-router-dom';
import { Form, Stack, Table } from 'react-bootstrap';
import { useEffect, useMemo, useState, useContext } from 'react';
import { getGrades } from '../utils/formAPI';
import AuthContext from '../context/AuthContext';

const Grades = () => {
  const { classes } = useOutletContext();
  const {
    user: { token, role },
  } = useContext(AuthContext);
  const [filterClass, setFilterClass] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [grades, setGrades] = useState([]);

  console.log(role);

  useEffect(() => {
    getGrades(token).then(({ data }) => setGrades(data));
  }, [token]);

  console.log(grades);

  const filteredGrades = useMemo(() => {
    if (filterClass !== 'all' && filterType !== 'all') {
      return grades.filter(
        (g) => g.class_id.toString() === filterClass && g.type === filterType
      );
    }
    if (filterClass !== 'all')
      return grades.filter((g) => g.class_id.toString() === filterClass);

    if (filterType !== 'all') {
      return grades.filter((g) => g.type === filterType);
    }

    return grades;
  }, [grades, filterClass, filterType]);

  return (
    <>
      <Stack direction="horizontal" className="justify-content-between mb-3">
        <h2>My Grades</h2>
        <Stack direction="horizontal" className="gap-5">
          <Form.Group
            className="d-flex align-items-center gap-2"
            controlId="filterByClass"
          >
            <Form.Label className="m-0">Class</Form.Label>
            <Form.Select
              style={{ width: '200px' }}
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="all">All</option>
              {classes.map((_class) => (
                <option key={_class.id} value={_class.id}>
                  {_class.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="d-flex align-items-center gap-2"
            controlId="filterByType"
          >
            <Form.Label className="m-0">Type</Form.Label>
            <Form.Select
              style={{ width: '200px' }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="assignment">assignments</option>
              <option value="test">tests</option>
            </Form.Select>
          </Form.Group>
        </Stack>
      </Stack>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Class</th>
            <th>Title</th>
            {role === 'teacher' && <th>Student</th>}
            <th>Type</th>
            <th>Submit Time</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade, idx) => (
            <tr key={grade.id}>
              <td>{idx + 1}</td>
              <td>{grade.name}</td>
              <td>{grade.title}</td>
              <td>{grade.full_name}</td>
              <td>
                {grade.type.charAt(0).toUpperCase() + grade.type.slice(1)}
              </td>
              <td>{grade.date_time}</td>
              <td>{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default Grades;
