import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import ClassNavigation from '../components/Navigation/ClassNavigation';

const ClassPage = () => {
  const [active, setActive] = useState('Feed');

  return (
    <Row>
      <Col md={3}>
        <div className="sticky-top">
          <h3>Class Name</h3>

          <ClassNavigation active={active} />
        </div>
      </Col>
      <Col
        md={9}
        style={{
          height: '80vh',
        }}
      >
        <Outlet context={setActive} />
      </Col>
    </Row>
  );
};
export default ClassPage;
