import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ClassNavigation from '../components/Navigation/ClassNavigation';
import { getClass } from '../utils/classAPI';
import AuthContext from '../context/AuthContext';

const ClassPage = () => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState('Feed');
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState({
    full_name: '',
    name: '',
    description: '',
    num_people: '',
    id: '',
    code: '',
    isArchived: null,
  });

  const {
    full_name: instructor,
    name,
    description,
    num_people,
    archived: isArchived,
  } = classData;

  useEffect(() => {
    getClass(user.token, id)
      .then(({ data }) => {
        setClassData(data);
      })
      .catch(() => {
        navigate('/classes');
      });
  }, [id, user, navigate]);

  return (
    <Row className="h-100">
      <Col md={3}>
        <div className="sticky-top">
          <h3>{name}</h3>

          <ClassNavigation active={active} />
        </div>
      </Col>
      <Col md={9}>
        <Outlet
          context={{
            setActive,
            instructor,
            name,
            description,
            num_people,
            id,
            isArchived,
            setClassData,
          }}
        />
      </Col>
    </Row>
  );
};
export default ClassPage;
