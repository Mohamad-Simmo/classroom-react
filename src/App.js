import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Containers/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ClassPage from './pages/ClassPage';
import ClassesContainer from './components/Containers/ClassesContainer';
import Landing from './pages/Landing';
import Feed from './components/Feed/Feed';
import Material from './components/Material/Material';
import Tests from './components/Tests/Tests';
import Assignments from './components/Assignments/Assignments';
import Chat from './components/Chat/Chat';
import People from './components/People/People';
import ClassSettings from './components/Settings/ClassSettings';
import Archived from './pages/Archived';
import NotFound from './pages/NotFound';
import Forms from './pages/Forms';
import EditForm from './pages/EditForm';
import SolveForm from './pages/SolveForm';
import Grades from './pages/Grades';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Landing />} />
          {user && (
            <Route path="/classes" element={<ClassesContainer />}>
              <Route index element={<Home />} />
              <Route path="/classes/archived" element={<Archived />} />
              <Route path="/classes/:id" element={<ClassPage />}>
                <Route index element={<Feed />} />
                <Route path="/classes/:id/material" element={<Material />} />
                <Route
                  path="/classes/:id/assignments"
                  element={<Assignments />}
                />
                <Route path="/classes/:id/tests" element={<Tests />} />
                <Route path="/classes/:id/people" element={<People />} />
                {user.role === 'teacher' && (
                  <Route
                    path="/classes/:id/settings"
                    element={<ClassSettings />}
                  />
                )}
              </Route>
            </Route>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {user && (
            <>
              {user.role === 'teacher' && (
                <Route path="/forms" element={<Forms />} />
              )}
              <Route path="/grades" element={<Grades />} />
            </>
          )}
        </Route>
        {user && (
          <>
            {user.role === 'teacher' && (
              <Route path="/forms/edit" element={<EditForm />} />
            )}
            <Route
              path="/classes/:id/:form_type/:form_id/:assign_id"
              element={<SolveForm />}
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
