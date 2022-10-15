import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ClassPage from './pages/ClassPage';
import ClassesContainer from './pages/ClassesContainer';
import Landing from './pages/Landing';
import Feed from './components/Feed';
import Material from './components/Material';
import Tests from './components/Tests';
import Assignments from './components/Assignments';
import Chat from './components/Chat';
import People from './components/People';
import ClassSettings from './components/ClassSettings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Landing />} />
          <Route path="/classes" element={<ClassesContainer />}>
            <Route index element={<Home />} />
            <Route path="/classes/:id" element={<ClassPage />}>
              <Route index element={<Feed />} />
              <Route path="/classes/:id/material" element={<Material />} />
              <Route
                path="/classes/:id/assignments"
                element={<Assignments />}
              />
              <Route path="/classes/:id/tests" element={<Tests />} />
              <Route path="/classes/:id/chat" element={<Chat />} />
              <Route path="/classes/:id/people" element={<People />} />
              <Route path="/classes/:id/settings" element={<ClassSettings />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
