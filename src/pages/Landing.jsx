import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { GiBookmarklet } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/classes');
    }
  }, [user, navigate]);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <GiBookmarklet className="text-dark" style={{ fontSize: '72px' }} />
      <h1 className="display-5 fw-bold text-dark">Classroom</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          A platform that allows teachers and students to interact and
          collaborate in a virtual classroom setting.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/register" className="btn btn-primary btn-lg px-4 gap-3">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Landing;
