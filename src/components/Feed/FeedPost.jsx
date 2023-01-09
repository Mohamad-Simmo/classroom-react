import MDEditor from '@uiw/react-md-editor';
import Stack from 'react-bootstrap/Stack';
import Avatar from '../UI/Avatar';
import { formatDate } from '../../utils/helpers';

const FeedPost = ({ source, name, time }) => {
  return (
    <div className="p-3 border rounded my-3">
      <Stack
        direction="horizontal"
        className="justify-content-between align-items-baseline"
      >
        <Stack
          direction="horizontal"
          gap={3}
          className="align-items-center mb-2"
        >
          <Avatar />
          <div className="fs-6 fw-semibold">{name}</div>
        </Stack>
        <div className="text-muted">{formatDate(new Date(time))}</div>
      </Stack>
      <MDEditor.Markdown className="bg-light" source={source} />
    </div>
  );
};
export default FeedPost;
