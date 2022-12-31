import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import { tabs } from '../../constants/tabs';
import { useState, useEffect, useMemo } from 'react';

const ClassNavigation = ({ active, assigned, isArchived }) => {
  const [count, setCount] = useState({ tests: 0, assignments: 0 });

  useEffect(() => {
    if (!isArchived) {
      setCount({
        tests: assigned.filter((a) => a.type === 'test').length,
        assignments: assigned.filter((a) => a.type === 'assignment').length,
      });
    }
  }, [assigned, isArchived]);

  const filteredTabs = useMemo(() => {
    if (isArchived) {
      return tabs.filter(
        (tab) => tab.name !== 'Assignments' && tab.name !== 'Tests'
      );
    } else {
      return tabs;
    }
  }, [isArchived]);

  return (
    <Nav
      className="flex-row flex-md-column flex-nowrap overflow-auto mb-3"
      variant="pills"
    >
      {filteredTabs.map((tab, idx) => (
        <Nav.Link
          key={idx}
          as={Link}
          className={`mb-1 ${
            active === tab.active ? 'text-light' : 'text-black'
          }`}
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
