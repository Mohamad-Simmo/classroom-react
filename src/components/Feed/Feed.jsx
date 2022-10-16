import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useState, useRef } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Avatar from '../UI/Avatar';

const Feed = () => {
  const setActive = useOutletContext();
  const [value, setValue] = useState('');
  const accordionRef = useRef(null);
  useEffect(() => {
    setActive('Feed');
  });

  const handleReset = (e) => {
    e.preventDefault();
    setValue('');
    accordionRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Accordion className="accordion-post">
        <Accordion.Item eventKey={1}>
          <Accordion.Button ref={accordionRef}>New Post</Accordion.Button>
          <Accordion.Body>
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <MDEditor
                value={value}
                onChange={setValue}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                className="mb-3"
              />

              <Stack
                direction="horizontal"
                gap={2}
                className="justify-content-end"
              >
                <Button type="reset" variant="dark">
                  Cancel
                </Button>
                <Button type="submit" variant="info">
                  Submit
                </Button>
              </Stack>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

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
            <div className="fs-6 fw-semibold">Name</div>
          </Stack>
          <div className="text-muted">Date</div>
        </Stack>
        <MDEditor.Markdown source="Hello Markdown!" />
      </div>

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
            <div className="fs-6 fw-semibold">Name</div>
          </Stack>
          <div className="text-muted">Date</div>
        </Stack>
        <MDEditor.Markdown source="Hello Markdown!" />
      </div>
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
            <div className="fs-6 fw-semibold">Name</div>
          </Stack>
          <div className="text-muted">Date</div>
        </Stack>
        <MDEditor.Markdown source="Hello Markdown!" />
      </div>
    </>
  );
};
export default Feed;
