import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

const People = () => {
  const { setActive } = useOutletContext();
  useEffect(() => {
    setActive('People');
  });
  return <div>People</div>;
};
export default People;
