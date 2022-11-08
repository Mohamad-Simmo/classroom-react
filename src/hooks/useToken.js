import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useToken = () => {
  const { user } = useContext(AuthContext);
  return user.token;
};

export default useToken;
