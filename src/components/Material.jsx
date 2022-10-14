import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Material = () => {
  const setActive = useOutletContext();
  useEffect(() => {
    setActive('Material');
  });
  return <div>Material</div>;
};
export default Material;
