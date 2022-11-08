import { useParams } from 'react-router-dom';
import { Container, Form, Stack } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { solveAssigned } from '../utils/formAPI';
import useToken from '../hooks/useToken';
import useHttp from '../hooks/useHttp';

const SolveForm = () => {
  const [selected, setSelected] = useState([]);
  const { id, form_type, assign_id } = useParams();
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

  console.log(selected);

  if (isLoading) return 'Loading...';

  if (isError) return 'Network Error';

  return (
    <Container className="py-4">
      <h1 className="text-center">{data.title}</h1>
      <h6 className="position-fixed bottom-0 end-0 p-3 m-3 rounded text-bg-success">
        {timeLeft}
      </h6>

      <Form>
        {data.questions.map((question) => (
          <div className="border rounded-3 p-3 mb-4" key={question.id}>
            <h5>{question.question}</h5>
            <p>{question.grade}</p>
            <div className="ps-3">
              {question.choices.map((choice) => (
                <Form.Check
                  onChange={handleInputChange}
                  key={choice.id}
                  type="radio"
                  id={choice.id}
                  label={choice.choice}
                  name={question.id}
                  className="mb-2"
                  value={choice.id}
                />
              ))}
            </div>
          </div>
        ))}
      </Form>
    </Container>
  );
};
export default SolveForm;
