import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Index;
