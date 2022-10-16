import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Chat = () => {
  const setActive = useOutletContext();
  useEffect(() => {
    setActive('Chat');
  });
  return <div>Chat</div>;
};
export default Chat;
