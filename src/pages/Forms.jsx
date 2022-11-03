import { Container, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getForms } from '../utils/formAPI';
import AuthContext from '../context/AuthContext';
import { useContext, useEffect, useState, Fragment } from 'react';
import AssignFormModal from '../components/Modals/AssignFormModal';
import DeleteFormModal from '../components/Modals/DeleteFormModal';
import { getClasses } from '../utils/classAPI';

const Forms = () => {
  const { user } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [show, setShow] = useState('');
  const [buttons, setButtons] = useState();
  const [modalData, setModalData] = useState({});
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses(user.token).then(({ data }) => setClasses(data));
  }, [user]);

  const showModal = (e, modalData) => {
    setModalData(modalData);
    setShow(e.target.dataset.show);
  };

  const showButtons = (idx) => {
    setButtons(idx);
  };

  useEffect(() => {
    getForms(user.token).then(({ data }) => {
      setForms(data);
    });
  }, [user]);
  return (
    <>
      <DeleteFormModal
        show={show}
        setShow={setShow}
        data={modalData}
        setForms={setForms}
      />
      <AssignFormModal
        show={show}
        setShow={setShow}
        data={modalData}
        classes={classes}
      />
      <Container className="py-3">
        <Stack direction="horizontal" className="border-bottom border-dark">
          <h2>My Forms</h2>

          <Button
            variant="info"
            className="rounded-5 ms-auto mb-2"
            as={Link}
            to="edit"
          >
            Create Form
          </Button>
        </Stack>

        {forms.map((form, idx) => (
          <Fragment key={form.id}>
            <Stack
              direction="horizontal"
              className={
                'align-items-center p-3 justify-content-between ' +
                (buttons === idx && 'bg-warning bg-opacity-10')
              }
              onMouseEnter={() => showButtons(idx)}
              onMouseLeave={() => setButtons(null)}
            >
              <Stack direction="horizontal" gap={5}>
                <div className="text-muted">{idx + 1}</div>
                <div>{form.title}</div>
              </Stack>
              <Stack direction="horizontal">
                <Button
                  type="button"
                  data-show="assign"
                  onClick={(e) =>
                    showModal(e, { id: form.id, title: form.title })
                  }
                  variant="secondary"
                  size="sm"
                  className={
                    'me-3 px-5 ' + (buttons === idx ? 'visible' : 'invisible')
                  }
                >
                  Assign
                </Button>
                <Button
                  as={Link}
                  type="button"
                  variant="secondary"
                  size="sm"
                  className={
                    'me-3 px-5 ' + (buttons === idx ? 'visible' : 'invisible')
                  }
                  to={`edit?id=${form.id}`}
                >
                  Edit
                </Button>
              </Stack>
              <Button
                type="button"
                variant="danger"
                size="sm"
                data-show="delete"
                onClick={(e) =>
                  showModal(e, { id: form.id, title: form.title })
                }
                className={
                  'me-3 ' + (buttons === idx ? 'visible' : 'invisible')
                }
              >
                Delete
              </Button>
            </Stack>
            <hr className="m-0" />
          </Fragment>
        ))}
      </Container>
    </>
  );
};
export default Forms;
