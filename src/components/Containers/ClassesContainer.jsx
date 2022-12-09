
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { getClasses } from '../../utils/classAPI';
import AuthContext from '../../context/AuthContext';

const ClassesContainer = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setIsLoading(true);

      getClasses(user.token)
        .then((response) => {
          setClasses(response.data);
        })
        .then(() => setIsLoading(false));
    }
  }, [user, navigate, dispatch]);

  const addClass = (newClass) => {
    setClasses((prev) => [...prev, newClass]);
  };

  return <Outlet context={{ classes, addClass, isLoading }} />;
};
export default ClassesContainer;
