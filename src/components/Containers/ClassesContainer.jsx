import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';

const ClassesContainer = () => {
  return (
    <Container className="py-3" fluid="lg">
      <Outlet />
    </Container>
  );
};
export default ClassesContainer;
