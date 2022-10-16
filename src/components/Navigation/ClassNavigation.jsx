import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { tabs } from '../../constants/tabs';

const ClassNavigation = ({ active }) => {
  return (
    <Nav
      className="class-nav flex-row flex-md-column flex-nowrap overflow-auto mb-3"
      variant="pills"
    >
      {tabs.map((tab, idx) => (
        <Nav.Link
          key={idx}
          as={Link}
          className="class-nav-link"
          to={tab.link}
          active={active === tab.active}
        >
          <Stack direction="horizontal" gap={1} className="align-items-center">
            <div>{tab.icon}</div>
            <div className="text-nowrap">{tab.name}</div>
          </Stack>
        </Nav.Link>
      ))}
    </Nav>
  );
};
export default ClassNavigation;
