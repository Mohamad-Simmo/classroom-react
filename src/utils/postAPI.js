import axios from 'axios';
import { config } from './userAPI';

const base_url = 'http://localhost/classroom-api';
const route = '/api/posts';

export const createPost = async (token, postData) => {
  return await axios.post(
    base_url + route + '/create.php',
    postData,
    config(token)
  );
};

export const getPosts = async (token, classID) => {
  return await axios.get(
    base_url + route + '/get.php?class_id=' + classID,
    config(token)
  );
};
