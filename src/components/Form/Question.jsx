import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Choice from './Choice';

const Question = ({
  index,
  questionValue,
  addChoice,
  choices,
  removeQuestion,
  removeChoice,
  handleQuestionChange,
  handleChoiceChange,
}) => {
  return (
    <Form.Group className="mb-3" controlId={`formQuestion${index}`}>
      <Form.Label>{index + 1}</Form.Label>
      <Form.Control
        type="text"
        placeholder="Question"
        value={questionValue}
        onChange={(e) => handleQuestionChange(e, index)}
      />
      {choices.map((c, idx) => (
        <Choice
          index={idx}
          questionIndex={index}
          key={idx}
          removeChoice={removeChoice}
          choiceValue={c.choice}
          handleChoiceChange={handleChoiceChange}
        />
      ))}
      <Button onClick={() => addChoice(index)}>Add Choice</Button>{' '}
      <Button onClick={() => removeQuestion(index)}>Delete Question</Button>
    </Form.Group>
  );
};
export default Question;
