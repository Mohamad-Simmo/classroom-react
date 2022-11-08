import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const AssignedCard = ({ title, id, end }) => {
  return (
    <Card className="p-3 card-link" as={Link} to={`${id}`}>
      <Card.Title className="mb-3">{title}</Card.Title>
      <Card.Subtitle className="text-muted">Due {end}</Card.Subtitle>
    </Card>
  );
};
export default AssignedCard;
