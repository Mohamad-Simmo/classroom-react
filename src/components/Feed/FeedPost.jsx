import MDEditor from '@uiw/react-md-editor';
import Stack from 'react-bootstrap/Stack';
import Avatar from '../UI/Avatar';

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
        <div className="text-muted">{time}</div>
      </Stack>
      <MDEditor.Markdown source={source} />
    </div>
  );
};
export default FeedPost;
