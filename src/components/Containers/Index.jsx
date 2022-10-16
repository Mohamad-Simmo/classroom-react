import { Outlet } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';

const Index = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Index;
