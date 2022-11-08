import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import AssignedCard from '../UI/AssignedCard';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const { setActive, assigned } = useOutletContext();
  useEffect(() => {
    setActive('Tests');
    setTests(() => assigned.filter((a) => a.type === 'test'));
  }, [assigned]);
  return (
    <Row className="g-3">
      {tests.map((t) => (
        <Col key={t.assigned_id} xs={12} md={6} lg={4} className="pe-3">
          <AssignedCard
            title={t.title}
            id={t.assigned_id}
            end={t.end_date_time}
          />
        </Col>
      ))}
    </Row>
  );
};
export default Tests;
