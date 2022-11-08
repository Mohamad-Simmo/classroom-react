import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import { tabs } from '../../constants/tabs';
import { useState, useEffect, useContext } from 'react';
import { getAssignedCount } from '../../utils/formAPI';
import AuthContext from '../../context/AuthContext';

const ClassNavigation = ({ active, classID }) => {
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState({ tests: 0, assignments: 0 });

  useEffect(() => {
    getAssignedCount(user.token, classID).then(({ data }) => setCount(data));
  }, [user, classID]);

  return (
    <Nav
      className="class-nav flex-row flex-md-column flex-nowrap overflow-auto mb-3"
      variant="pills"
    >
      {tabs.map((tab, idx) => (
        <Nav.Link
          key={idx}
          as={Link}
          className="class-nav-link mb-1"
          to={tab.link}
          active={active === tab.active}
        >
          <Stack direction="horizontal" gap={1} className="align-items-center">
            <div>{tab.icon}</div>
            <div className="text-nowrap">{tab.name}</div>
            {tab.name === 'Tests' && count.tests > 0 && (
              <Badge className="ms-auto bg-danger" bg="secondary">
                {count.tests}
              </Badge>
            )}
            {tab.name === 'Assignments' && count.assignments > 0 && (
              <Badge className="ms-auto bg-danger" bg="secondary">
                {count.assignments}
              </Badge>
            )}
          </Stack>
        </Nav.Link>
      ))}
    </Nav>
  );
};
export default ClassNavigation;
