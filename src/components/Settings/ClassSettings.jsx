import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ClassSettings = () => {
  const setActive = useOutletContext();
  useEffect(() => {
    setActive('Settings');
  });
  return <div>ClassSettings</div>;
};
export default ClassSettings;
