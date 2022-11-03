import { Button, Stack, Form } from 'react-bootstrap';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';

const Choice = ({ index, questions, setQuestions, questionIndex, choice }) => {
  const { correctChoiceIndex } = questions[questionIndex];
  const isCorrect = index === correctChoiceIndex;

  const removeChoice = () => {
    const questionsTemp = [...questions];
    const question = questionsTemp[questionIndex];
    const choicesTemp = [...question.choices];

    choicesTemp.splice(index, 1);

    if (question.correctChoiceIndex === index) {
      question.correctChoiceIndex = null;
    } else if (index < question.correctChoiceIndex) {
      question.correctChoiceIndex--;
    }

    questionsTemp[questionIndex] = {
      ...questionsTemp[questionIndex],
      choices: [...choicesTemp],
    };

    setQuestions([...questionsTemp]);
  };

  const handleChoiceChange = (event) => {
    const questionsTemp = [...questions];
    const choicesTemp = [...questionsTemp[questionIndex].choices];
    choicesTemp[index] = event.target.value;

    questionsTemp[questionIndex] = {
      ...questionsTemp[questionIndex],
      choices: choicesTemp,
    };
    setQuestions(questionsTemp);
  };

  const setCorrect = (event) => {
    event.preventDefault();
    const questionsTemp = [...questions];

    questionsTemp[questionIndex] = {
      ...questionsTemp[questionIndex],
      correctChoiceIndex: index,
    };

    setQuestions(questionsTemp);
  };

  return (
    <Stack direction="horizontal" gap={2} className="mb-2">
      <Form.Label className="m-0">
        {String.fromCharCode(index + 97)}.
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Choice"
        value={choice}
        onChange={handleChoiceChange}
      />
      <Button
        type="checkbox"
        variant={isCorrect ? 'success' : 'outline-secondary'}
        onClick={setCorrect}
        className="border-0"
      >
        <AiOutlineCheck />
      </Button>
      <Button
        variant="outline-danger"
        className="border-0"
        onClick={removeChoice}
      >
        <AiOutlineDelete />
      </Button>
    </Stack>
  );
};
export default Choice;
