import { MdOutlineFeedback, MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsJournalBookmark, BsChatDots, BsPeople } from 'react-icons/bs';
import { GoNote } from 'react-icons/go';

export const tabs = [
  {
    name: 'Feed',
    link: '',
    active: 'Feed',
    icon: <MdOutlineFeedback />,
  },
  {
    name: 'Learning Material',
    link: 'material',
    active: 'Material',
    icon: <BsJournalBookmark />,
  },
  {
    name: 'Chat',
    link: 'chat',
    active: 'Chat',
    icon: <BsChatDots />,
  },
  {
    name: 'Assignments',
    link: 'assignments',
    active: 'Assignments',
    icon: <MdOutlineAssignmentTurnedIn />,
  },
  {
    name: 'Tests',
    link: 'tests',
    active: 'Tests',
    icon: <GoNote />,
  },
  {
    name: 'People',
    link: 'people',
    active: 'People',
    icon: <BsPeople />,
  },
  {
    name: 'Settings',
    link: 'settings',
    active: 'Settings',
    icon: <IoSettingsOutline />,
  },
];
