import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import AssignedCard from '../UI/AssignedCard';

const Assignments = () => {
  const { setActive, assigned } = useOutletContext();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setActive('Assignments');
    setAssignments(assigned.filter((a) => a.type === 'assignment'));
  }, [assigned, setActive]);

  return (
    <Row className="g-3">
      {assignments.length ? (
        assignments.map((a) => (
          <Col key={a.assigned_id} xs={12} md={6} lg={4} className="pe-3">
            <AssignedCard
              title={a.title}
              id={a.assigned_id}
              form_id={a.form_id}
              end={a.end_date_time}
            />
          </Col>
        ))
      ) : (
        <h6 className="text-muted text-center mt-5 pt-5">
          You currently have no assignments!
        </h6>
      )}
    </Row>
  );
};
export default Assignments;
