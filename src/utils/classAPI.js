import axios from 'axios';

const base_url = 'http://localhost/classroom-api';
const route = '/api/classes';

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getClasses = async (token) => {
  return await axios.get(base_url + route + '/read.php', config(token));
};

export const getClass = async (token, id) => {
  return await axios.get(
    base_url + route + '/read_single.php?id=' + id,
    config(token)
  );
};

export const createClass = async (token, classData) => {
  return await axios.post(
    base_url + route + '/create.php',
    classData,
    config(token)
  );
};

export const updateClass = async (token, classData) => {
  return await axios.post(
    base_url + route + '/update.php',
    classData,
    config(token)
  );
};

export const archiveClass = async (token, classData) => {
  return await axios.put(
    base_url + route + '/archive.php',
    classData,
    config(token)
  );
};

export const deleteClass = async (token, classData) => {
  const { headers } = config(token);
  return await axios.delete(base_url + route + '/delete.php', {
    headers,
    data: classData,
  });
};
