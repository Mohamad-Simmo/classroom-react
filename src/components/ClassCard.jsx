import Card from 'react-bootstrap/Card';
import { BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ClassCard = ({ id, instructor, title, description, code, people }) => {
  return (
    <Card
      as={Link}
      to={`/classes/${id}`}
      style={{ color: 'inherit', textDecoration: 'inherit' }}
      className="card-hover"
    >
      <Card.Header>{instructor}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end bg-white border-0">
        <span className="d-flex align-items-center gap-1">
          <BsPeopleFill />
          {people}
        </span>
      </Card.Footer>
    </Card>
  );
};
export default ClassCard;
