import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const Home = () => {
  const { user } = useContext(AuthContext);

  return <div>Home</div>;
};
export default Home;
