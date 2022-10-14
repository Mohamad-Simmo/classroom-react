import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { MdOutlineFeedback, MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { BsJournalBookmark, BsChatDots } from 'react-icons/bs';
import { GoNote } from 'react-icons/go';
const ClassNavigation = ({ active }) => {
  return (
    <Nav className={'class-nav flex-column'} variant="pills">
      <Nav.Link
        as={Link}
        className="class-nav-link"
        to=""
        active={active === 'Feed'}
      >
        <MdOutlineFeedback className="me-2" /> Feed
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="material"
        className="class-nav-link"
        active={active === 'Material'}
      >
        <BsJournalBookmark className="me-2" /> Learning Material
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="assignments"
        className="class-nav-link"
        active={active === 'Assignments'}
      >
        <MdOutlineAssignmentTurnedIn className="me-2" /> Assignments
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="tests"
        className="class-nav-link"
        active={active === 'Tests'}
      >
        <GoNote className="me-2" /> Tests
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="chat"
        className="class-nav-link"
        active={active === 'Chat'}
      >
        <BsChatDots className="me-2" /> Chat
      </Nav.Link>
    </Nav>
  );
};
export default ClassNavigation;
