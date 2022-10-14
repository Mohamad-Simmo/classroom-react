import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Feed = () => {
  const setActive = useOutletContext();
  useEffect(() => {
    setActive('Feed');
  });

  return <div>Feed</div>;
};
export default Feed;
