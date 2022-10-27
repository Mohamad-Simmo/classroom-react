import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Question from '../components/Form/Question';
import Container from 'react-bootstrap/Container';

const choice = { choice: '', isCorrect: false };

const question = {
  question: '',
  choices: [choice],
  grade: null,
};

const NewForm = () => {
  const [questions, setQuestions] = useState([question]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, question]);
  };

  const removeQuestion = (index) => {
    const questionsTemp = questions;
    questionsTemp.splice(index, 1);
    setQuestions([...questionsTemp]);
  };

  const addChoice = (index) => {
    const questionsTemp = questions;
    const choicesTemp = [...questions[index].choices, choice];
    questionsTemp[index] = {
      ...questionsTemp[index],
      choices: choicesTemp,
    };
    setQuestions([...questionsTemp]);
  };

  const removeChoice = (questionIndex, choiceIndex) => {
    const questionsTemp = questions;
    const choicesTemp = [...questionsTemp[questionIndex].choices];
    choicesTemp.splice(choiceIndex, 1);
    questionsTemp[questionIndex] = {
      ...questionsTemp[questionIndex],
      choices: choicesTemp,
    };
    setQuestions([...questionsTemp]);
  };

  const handleQuestionChange = (event, index) => {
    const questionsTemp = questions;
    questionsTemp[index] = {
      ...questionsTemp[index],
      question: event.target.value,
    };
    setQuestions([...questionsTemp]);
  };

  const handleChoiceChange = (event, questionIndex, choiceIndex) => {
    const questionsTemp = questions;
    const choicesTemp = [...questionsTemp[questionIndex].choices];
    choicesTemp[choiceIndex] = {
      ...choicesTemp[choiceIndex],
      choice: event.target.value,
    };

    questionsTemp[questionIndex] = {
      ...questionsTemp[questionIndex],
      choices: choicesTemp,
    };
    setQuestions([...questionsTemp]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questions);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} autoComplete="off">
        {questions.map((q, idx) => (
          <Question
            key={idx}
            questionValue={q.question}
            index={idx}
            choices={q.choices}
            grade={q.grade}
            addChoice={addChoice}
            removeQuestion={removeQuestion}
            removeChoice={removeChoice}
            handleQuestionChange={handleQuestionChange}
            handleChoiceChange={handleChoiceChange}
          />
        ))}
        <Button onClick={addQuestion}>Add Question</Button>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
export default NewForm;
