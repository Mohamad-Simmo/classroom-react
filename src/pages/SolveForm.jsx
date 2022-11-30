import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Stack, Button } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { solveAssigned, submitAssigned } from '../utils/formAPI';
import useToken from '../hooks/useToken';
import useHttp from '../hooks/useHttp';

const SolveForm = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const { id, assign_id, form_id, form_type } = useParams();
  const [timeLeft, setTimeLeft] = useState(new Date().toLocaleString());
  const token = useToken();

  const { data, isError, isLoading } = useHttp(
    useCallback(() => solveAssigned(token, assign_id), [token, assign_id])
  );

  useEffect(() => {
    if (!isLoading && !isError) {
      setSelected(
        new Array(data.questions.length)
          .fill()
          .map((_, i) => ({ question_id: data.questions[i].id, choice_id: '' }))
      );
    }
  }, [data, isLoading, isError]);

  const handleInputChange = (e) => {
    const newSelectedArr = [...selected];
    newSelectedArr[
      newSelectedArr.findIndex(
        (obj) => obj.question_id === parseInt(e.target.name)
      )
    ].choice_id = parseInt(e.target.value);

    setSelected(newSelectedArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitAssigned(token, {
      form_id: form_id,
      assign_id: assign_id,
      answers: selected,
    }).then(() => navigate(`/classes/${id}/${form_type}`));
  };

  if (isLoading) return 'Loading...';

  if (isError) return 'Network Error';

  return (
    <Container className="py-4">
      <h1 className="text-center">{data.title}</h1>
      <hr />
      <h6 className="position-fixed bottom-0 end-0 p-3 m-3 rounded text-bg-success">
        {timeLeft}
      </h6>

      <Form onSubmit={handleSubmit}>
        {data.questions.map((question, idx) => (
          <Form.Group
            className="border rounded-3 p-3 mb-4 bg-light"
            key={question.id}
          >
            <Stack
              direction="horizontal"
              gap={3}
              className="aligh-items-center mb-3"
            >
              <div className="text-muted fs-6 m-0">{idx + 1}.</div>
              <Form.Label className="h5 m-0">{question.question}</Form.Label>
              <div className="ms-auto fw-light">Grade {question.grade}</div>
            </Stack>

            {question.choices.map((choice) => (
              <Form.Check
                required
                onChange={handleInputChange}
                key={choice.id}
                type="radio"
                id={choice.id}
                label={choice.choice}
                name={question.id}
                className="my-2 fs-6 ms-4"
                value={choice.id}
              />
            ))}
          </Form.Group>
        ))}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
export default SolveForm;
