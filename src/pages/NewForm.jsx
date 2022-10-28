import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Question from '../components/Form/Question';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

import { AiOutlinePlus } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

const question = {
  question: '',
  choices: [{ choice: '', isCorrect: false }],
  grade: null,
};

const NewForm = () => {
  const [questions, setQuestions] = useState([question]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, question]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questions);
  };

  return (
    <Container className="py-3">
      <Stack
        direction="horizontal"
        gap={1}
        className="align-items-bottom border-bottom border-secondary w-sm-25"
      >
        <Form.Control
          plaintext
          placeholder="Form Title"
          className="fs-2"
          autoFocus
        />
        <FiEdit2 className="fs-4 text-secondary " />
      </Stack>
      <Form onSubmit={handleSubmit} autoComplete="off">
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
          <Button variant="dark" className="rounded-5" onClick={addQuestion}>
            <AiOutlinePlus /> Question
          </Button>
          <Button type="submit" variant="info">
            Save
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};
export default NewForm;
