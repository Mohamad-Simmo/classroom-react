import { useOutletContext } from 'react-router-dom';
import ClassCard from '../components/UI/ClassCard';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Archived = () => {
  const { classes: all } = useOutletContext();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setClasses(all.filter((_class) => !!_class.archived === true));
  }, [all]);

  return (
    <>
      <h2 className="border-bottom border-dark pb-1">Archived Classes</h2>
      <Row>
        {classes.map((_class) => {
          const { full_name, id, name, description, code, num_people } = _class;
          return (
            <Col xs={12} md={6} lg={4} className="p-3" key={id}>
              <ClassCard
                id={id}
                instructor={full_name}
                title={name}
                description={description}
                code={code}
                people={num_people}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default Archived;
