import { Button, Stack, Form } from 'react-bootstrap';

const Choice = ({
  index,
  removeChoice,
  questionIndex,
  choiceValue,
  handleChoiceChange,
}) => {
  return (
    <Stack direction="horizontal">
      <Form.Label>{index + 1}</Form.Label>
      <Form.Control
        type="text"
        placeholder="Choice"
        value={choiceValue}
        onChange={(e) => handleChoiceChange(e, questionIndex, index)}
      />
      <Button
        variant="danger"
        onClick={() => removeChoice(questionIndex, index)}
      >
        Remove choice
      </Button>
    </Stack>
  );
};
export default Choice;
