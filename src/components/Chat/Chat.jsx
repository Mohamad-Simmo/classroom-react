import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineSend } from 'react-icons/ai';
import Message from './Message';

const Chat = () => {
  const { setActive } = useOutletContext();
  useEffect(() => {
    setActive('Chat');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sendStyle = ['text-bg-info ms-auto'];
  const receiveStyle = ['text-bg-light'];

  return (
    <Stack className="border h-100">
      <div className="overflow-auto p-2">
        <Message className={receiveStyle}>Hello World!</Message>
        <Message className={sendStyle}>Goodbye!</Message>
      </div>
      <Form className="mt-auto d-flex border-top" onSubmit={handleSubmit}>
        <Form.Control type="text" placeholder="Message" className="border-0" />
        <Button type="submit" variant="info" title="Send">
          <AiOutlineSend />
        </Button>
      </Form>
    </Stack>
  );
};
export default Chat;
