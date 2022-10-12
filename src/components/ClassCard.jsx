import Card from 'react-bootstrap/Card';
import { BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ClassCard = ({ id, instructor, title, description, code, people }) => {
  return (
    <Card
      as={Link}
      to={id}
      style={{ color: 'inherit', textDecoration: 'inherit' }}
    >
      <Card.Header>{instructor}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <BsPeopleFill />
        {people}
      </Card.Footer>
    </Card>
  );
};
export default ClassCard;
