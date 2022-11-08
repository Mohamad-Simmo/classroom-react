import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ClassNavigation from '../components/Navigation/ClassNavigation';
import { getClass } from '../utils/classAPI';
import { getAssigned } from '../utils/formAPI';
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

  const [assigned, setAssigned] = useState([]);
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

    getAssigned(user.token, id).then(({ data }) => setAssigned(data));
  }, [id, user]);

  return (
    <>
      <Stack className="rounded-3 text-bg-dark justify-content-end p-3 cover">
        <h1>{name}</h1>
        <h5>{description}</h5>
      </Stack>
      <Row>
        <Col md={3}>
          <div className="sticky-top py-3">
            <ClassNavigation active={active} classID={classData.id} />
          </div>
        </Col>
        <Col md={9} className="pt-3">
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
              assigned,
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default ClassPage;
