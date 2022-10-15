import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Stack from 'react-bootstrap/Stack';
import useWindowDimensions from '../hooks/useWindowDimensions';
import ClassNavigation from '../components/ClassNavigation';

const ClassPage = () => {
  const { width } = useWindowDimensions();
  const [expand, setExpand] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState('Feed');

  useEffect(() => {
    if (width < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  return (
    <Row>
      <Col md={3}>
        <div className="sticky-top">
          <h3 className="d-none d-md-block">Class Name</h3>
          <Stack
            direction="horizontal"
            className="d-md-none justify-content-between"
            role="button"
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          >
            <h3>Class Name</h3>
            {expand ? (
              <BsChevronUp className="d-md-none h3" />
            ) : (
              <BsChevronDown className="d-md-none h3" />
            )}
          </Stack>

          {mobile ? (
            expand && <ClassNavigation active={active} />
          ) : (
            <ClassNavigation active={active} />
          )}
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
