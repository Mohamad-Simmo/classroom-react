import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useState, useRef } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { createPost, getPosts } from '../../utils/postAPI';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import FeedPost from './FeedPost';

const Feed = () => {
  const { user } = useContext(AuthContext);
  const { setActive, id } = useOutletContext();
  const [value, setValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);
  const accordionRef = useRef(null);

  useEffect(() => {
    setActive('Feed');

    getPosts(user.token, id).then(({ data }) => setPosts(data));
  }, [setActive, user, id]);

  const handleReset = () => {
    setValue('');
    setIsError(false);
    accordionRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) {
      setIsError(true);
      return;
    }
    createPost(user.token, {
      class_id: id,
      body: value,
    }).then(({ data }) => {
      setPosts((prev) => [data, ...prev]);
      handleReset();
    });
  };

  return (
    <>
      <Accordion className="accordion-post">
        <Accordion.Item eventKey={1}>
          <Accordion.Button ref={accordionRef} onClick={handleReset}>
            New Post
          </Accordion.Button>
          <Accordion.Body>
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <MDEditor
                value={value}
                onChange={setValue}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                className="mb-3"
              />
              <p className="text-danger" hidden={!isError}>
                Post cannot be empty
              </p>

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
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {posts.length === 0 ? (
        <h6 className="text-muted text-center mt-5 pt-5">
          No posts yet. Create a new one!
        </h6>
      ) : (
        posts.map((post) => (
          <FeedPost
            key={post.id}
            source={post.body}
            name={post.full_name}
            time={post.timestamp}
          />
        ))
      )}
    </>
  );
};
export default Feed;
