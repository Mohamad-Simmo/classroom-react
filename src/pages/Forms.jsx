import { Button, Stack } from 'react-bootstrap';
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
  const [modalData, setModalData] = useState({});
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses(user.token).then(({ data }) => setClasses(data));
  }, [user]);

  const showModal = (e, modalData) => {
    setModalData(modalData);
    setShow(e.target.dataset.show);
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
          <div className="align-items-center p-2 justify-content-between d-block d-sm-flex">
            <Stack direction="horizontal" gap={3}>
              <div className="text-muted">{idx + 1}</div>
              <div>{form.title}</div>
            </Stack>
            <Stack className="justify-content-end" direction="horizontal">
              <Button
                type="button"
                data-show="assign"
                onClick={(e) =>
                  showModal(e, { id: form.id, title: form.title })
                }
                variant="primary"
                size="sm"
                className="me-3 px-3"
              >
                Assign
              </Button>
              <Button
                as={Link}
                type="button"
                variant="primary"
                size="sm"
                className="me-3 px-3"
                to={`edit?id=${form.id}`}
              >
                Edit
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                data-show="delete"
                onClick={(e) =>
                  showModal(e, { id: form.id, title: form.title })
                }
                className="me-3 "
              >
                Delete
              </Button>
            </Stack>
          </div>
          <hr className="m-0" />
        </Fragment>
      ))}
    </>
  );
};
export default Forms;
