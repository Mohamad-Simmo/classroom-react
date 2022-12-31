import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClasses } from '../../utils/classAPI';
import AuthContext from '../../context/AuthContext';

const ClassesContainer = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateClasses = useCallback(() => {
    setIsLoading(true);
    getClasses(user.token)
      .then((response) => {
        setClasses(response.data);
      })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [user.token]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      updateClasses();
    }
  }, [updateClasses, navigate, user]);

  const addClass = useCallback((newClass) => {
    setClasses((prev) => [newClass, ...prev]);
  }, []);

  return <Outlet context={{ classes, addClass, isLoading, updateClasses }} />;
};
export default ClassesContainer;
