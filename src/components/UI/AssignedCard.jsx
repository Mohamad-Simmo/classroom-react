import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const AssignedCard = ({ title, id, end, form_id }) => {
  return (
    <Card className="p-3 card-link" as={Link} to={`${form_id}/${id}`}>
      <Card.Title className="mb-3">{title}</Card.Title>
      <Card.Subtitle className="text-muted">
        Due {formatDate(new Date(end))}
      </Card.Subtitle>
    </Card>
  );
};
export default AssignedCard;
