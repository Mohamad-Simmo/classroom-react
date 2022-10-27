import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NotFound = () => {
  const { user } = useContext(AuthContext);
  return (
    <Stack
      className="justify-content-center"
      style={{
        height: 'calc(100% - 66px)',
      }}
      id="fullheight"
    >
      <h2 className="text-center">404 NOT FOUND</h2>
      <Button
        className="text-center mx-auto"
        variant="link"
        as={Link}
        to={user ? '/classes' : '/'}
      >
        Go back
      </Button>
    </Stack>
  );
};
export default NotFound;
