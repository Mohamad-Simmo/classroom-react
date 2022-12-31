import { useState, useRef, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Question from '../components/Form/Question';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

import { createForm, getForm, deleteForm } from '../utils/formAPI';

import { AiOutlinePlus } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

const question = {
  question: '',
  choices: [''],
  correctChoiceIndex: null,
  grade: '',
};

const EditForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [params] = useSearchParams();
  const [questions, setQuestions] = useState([question]);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [totalGrade, setTotalGrade] = useState(0);
  const [error, setError] = useState('');
  const formRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    if (params.get('id')) {
      getForm(user.token, params.get('id'))
        .then(({ data }) => {
          titleRef.current.value = data.title;
          let fetchedQuestions = [];

          let currentQuestion = [];
          for (let question of data.questions) {
            let currentChoices = [];
            for (let choice of question.choices) {
              currentChoices = [...currentChoices, choice.choice];
            }
            currentQuestion = [
              ...currentQuestion,
              {
                question: question.question,
                grade: question.grade,
                correctChoiceIndex: question.choices.findIndex(
                  (c) => c.id === question.correct_choice_id
                ),
                choices: currentChoices,
              },
            ];
            fetchedQuestions = currentQuestion;
          }
          return fetchedQuestions;
        })
        .then((f) => setQuestions(f));
    }
  }, [params, user]);

  useEffect(() => {
    window.scrollTo(0, formRef.current.scrollHeight);
  }, [toggleAdd]);

  useEffect(() => {
    setTotalGrade(() => {
      let sum = 0;
      for (let i in questions) {
        sum += parseInt(questions[i].grade) ? parseInt(questions[i].grade) : 0;
      }
      return sum;
    });
  }, [questions]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, question]);
    setToggleAdd((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titleRef.current.value.trim().length) {
      titleRef.current.focus();
      setError('Please add a title for your form');
      setTimeout(() => setError(''), 5000);
      return;
    }

    for (let q of questions) {
      if (q.correctChoiceIndex === null) {
        setError('Please select a correct choice for every question');
        setTimeout(() => setError(''), 5000);
        return;
      }
    }
    if (totalGrade !== 100) {
      setError('Invalid grade');
      setTimeout(() => setError(''), 5000);
      return;
    }

    // Submit edited form
    if (params.get('id')) {
      deleteForm(user.token, params.get('id'));
    }

    // create form
    createForm(user.token, { title: titleRef.current.value, questions }).then(
      () => {
        navigate('/forms');
      }
    );
  };

  return (
    <Container className="py-3">
      <Stack
        direction="horizontal"
        gap={1}
        className="align-items-bottom border-bottom border-secondary w-sm-25"
      >
        <Form.Control
          required
          ref={titleRef}
          plaintext
          placeholder="Form Title"
          className="fs-2"
          autoFocus
        />
        <FiEdit2 className="fs-4 text-secondary " />
      </Stack>
      <Form onSubmit={handleSubmit} autoComplete="off" ref={formRef}>
        {questions.map((q, idx) => (
          <Question
            key={idx}
            index={idx}
            currentQuestion={q}
            questions={questions}
            setQuestions={setQuestions}
          />
        ))}
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-between my-3"
        >
          <Stack direction="horizontal" gap={2} className="align-items-center">
            <Button variant="dark" className="rounded-5" onClick={addQuestion}>
              <AiOutlinePlus /> Question
            </Button>
            <div
              className={`p-2 ${
                (totalGrade < 0 || totalGrade > 100) && 'text-danger'
              } ${totalGrade === 100 && 'text-success'}`}
            >
              Total Grade: {totalGrade} / 100
            </div>
          </Stack>

          <Button type="submit" variant="info">
            Save
          </Button>
        </Stack>
        {error && <p className="m-0 text-danger">{error}</p>}
      </Form>
    </Container>
  );
};
export default EditForm;
