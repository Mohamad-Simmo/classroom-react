import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Assignments = () => {
  const setActive = useOutletContext();
  useEffect(() => {
    setActive('Assignments');
  });
  return <div>Assignments</div>;
};
export default Assignments;