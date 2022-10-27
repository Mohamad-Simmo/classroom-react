import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Tests = () => {
  const { setActive } = useOutletContext();
  useEffect(() => {
    setActive('Tests');
  }, [setActive]);
  return <div>Tests</div>;
};
export default Tests;
