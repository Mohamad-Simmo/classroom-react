import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Choice from './Choice';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

const Question = ({ index, currentQuestion, questions, setQuestions }) => {
  const { question: value, choices } = currentQuestion;

  const removeQuestion = (index) => {
    const questionsTemp = questions;
    questionsTemp.splice(index, 1);
    setQuestions([...questionsTemp]);
  };

  const addChoice = (index) => {
    const questionsTemp = questions;
    const choicesTemp = [
      ...questions[index].choices,
      { choice: '', isCorrect: false },
    ];
    questionsTemp[index] = {
      ...questionsTemp[index],
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

  return (
    <div className="border rounded bg-light p-3 my-3">
      <Form.Group
        className="d-flex align-items-center gap-2"
        controlId={`formQuestion${index}`}
      >
        <Form.Label className="m-0">{index + 1}.</Form.Label>
        <Form.Control
          className=""
          type="text"
          placeholder="Question"
          value={value}
          onChange={(e) => handleQuestionChange(e, index)}
        />
        <Button
          variant="outline-danger"
          className="border-0"
          onClick={() => removeQuestion(index)}
        >
          <AiOutlineDelete />
        </Button>
      </Form.Group>

      <Container className="px-5 py-3">
        {choices.map((c, idx) => (
          <Choice
            key={idx}
            index={idx}
            questionIndex={index}
            currentChoice={c}
            questions={questions}
            setQuestions={setQuestions}
          />
        ))}
        <Button
          variant="dark"
          onClick={() => addChoice(index)}
          className="d-flex align-items-center gap-2 rounded-5"
        >
          <AiOutlinePlus />
          <div>Choice</div>
        </Button>
      </Container>
      <Form.Group
        className="d-flex align-items-center gap-2"
        controlId={`gradeInput${index}`}
      >
        <Form.Label className="m-0">Grade</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="100"
          placeholder="0"
          style={{
            width: '75px',
          }}
        />
      </Form.Group>
    </div>
  );
};
export default Question;
