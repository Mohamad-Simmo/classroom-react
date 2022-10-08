import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default IndexPage;
