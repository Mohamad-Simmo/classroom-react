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

  useEffect(() => {
    getGrades(token).then(({ data }) => setGrades(data));
  }, [token]);

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
      <div className="d-md-flex justify-content-between mb-3">
        <h2>My Grades</h2>
        <div className="d-sm-flex gap-5">
          <Form.Group
            className="row align-items-center gap-2 mb-3 mb-sm-0"
            controlId="filterByClass"
          >
            <Form.Label className="m-0 col-3 col-sm-auto">Class</Form.Label>
            <Form.Select
              className="col-8 col-sm-auto"
              style={{ width: '200px' }}
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="all">All</option>
              {classes.map((_class, idx) => (
                <option key={idx} value={_class.id}>
                  {_class.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="row align-items-center gap-2"
            controlId="filterByType"
          >
            <Form.Label className="m-0 col-3 col-sm-auto">Type</Form.Label>
            <Form.Select
              style={{ width: '200px' }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="col-8 col-sm-auto"
            >
              <option value="all">All</option>
              <option value="assignment">assignments</option>
              <option value="test">tests</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <Table bordered hover responsive>
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
              {role === 'teacher' && <td>{grade.full_name}</td>}
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
