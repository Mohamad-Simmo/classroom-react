import { Button, Stack, Form } from 'react-bootstrap';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';

const Choice = ({
  index,
  questions,
  setQuestions,
  questionIndex,
  currentChoice,
}) => {
  const { choice: value, isCorrect } = currentChoice;

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

  const setCorrect = (event, questionIndex, choiceIndex) => {
    event.preventDefault();
    const questionsTemp = questions;
    const choicesTemp = [...questionsTemp[questionIndex].choices];

    // reset choices array
    for (let index in choicesTemp) {
      choicesTemp[index] = { ...choicesTemp[index], isCorrect: false };
    }
    choicesTemp[choiceIndex] = { ...choicesTemp[choiceIndex], isCorrect: true };

    questionsTemp[questionIndex] = {
      ...questionsTemp[questionIndex],
      choices: choicesTemp,
    };

    setQuestions([...questionsTemp]);
  };

  return (
    <Stack direction="horizontal" gap={2} className="mb-2">
      <Form.Label className="m-0">
        {String.fromCharCode(index + 97)}.
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Choice"
        value={value}
        onChange={(e) => handleChoiceChange(e, questionIndex, index)}
      />
      <Button
        type="checkbox"
        variant={isCorrect ? 'success' : 'outline-secondary'}
        onClick={(e) => setCorrect(e, questionIndex, index)}
        className="border-0"
      >
        <AiOutlineCheck />
      </Button>
      <Button
        variant="outline-danger"
        className="border-0"
        onClick={() => removeChoice(questionIndex, index)}
      >
        <AiOutlineDelete />
      </Button>
    </Stack>
  );
};
export default Choice;
