import { useEffect, useState, useContext, useCallback } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Button, Stack, Form, Accordion } from 'react-bootstrap';
import { createSection, getSections } from '../../utils/materialAPI';
import AuthContext from '../../context/AuthContext';
import Section from './Section';

const Material = () => {
  const {
    user: { token },
  } = useContext(AuthContext);
  const { id: class_id } = useParams();
  const [newClicked, setNewClicked] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [sections, setSections] = useState([]);
  const { setActive, isArchived } = useOutletContext();

  useEffect(() => {
    setActive('Material');
  }, [setActive]);

  const updateSections = useCallback(() => {
    getSections(token, class_id).then(({ data }) => {
      setSections(data);
    });
  }, [token, class_id]);

  useEffect(() => {
    updateSections();
  }, [updateSections]);

  const handleInputChange = (e) => setInputTitle(e.target.value);

  const handleReset = () => {
    setInputTitle('');
    setNewClicked(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createSection(token, {
      class_id,
      title: inputTitle,
    }).then(({ data }) => setSections((prev) => [data, ...prev]));

    handleReset();
  };

  return (
    <>
      {!isArchived &&
        (newClicked ? (
          <Form onSubmit={handleSubmit} onReset={handleReset} className="mb-3">
            <Form.Group as={Stack} direction="horizontal" gap={2}>
              <Form.Control
                value={inputTitle}
                onChange={handleInputChange}
                type="text"
                placeholder="Section Title"
                autoFocus
                required
              />
              <Button type="submit" variant="info">
                Submit
              </Button>
              <Button variant="secondary" type="reset">
                Cancel
              </Button>
            </Form.Group>
          </Form>
        ) : (
          <Button
            variant="secondary"
            className="w-100 mb-3"
            onClick={() => setNewClicked((prev) => !prev)}
          >
            New Section
          </Button>
        ))}
      <Accordion>
        {sections.map((s, idx) => (
          <Section
            key={s.id}
            id={s.id}
            title={s.title}
            material={s.material}
            idx={idx}
            updateSections={updateSections}
          />
        ))}
      </Accordion>
    </>
  );
};
export default Material;
