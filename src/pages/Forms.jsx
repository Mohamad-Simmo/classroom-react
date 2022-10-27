import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Forms = () => {
  return (
    <Container>
      <h2>My Forms</h2>
      <Button as={Link} to="new">
        Create new form
      </Button>
    </Container>
  );
};
export default Forms;
