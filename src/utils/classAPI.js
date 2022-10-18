import axios from 'axios';

const base_url = 'http://localhost/classroom-api';
const route = '/api/classes';

export const getClasses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(base_url + route + '/read.php', config);
};

export const getClass = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(
    base_url + route + '/read_single.php?id=' + id,
    config
  );
};

export const createClass = async (token, classData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(base_url + route + '/create.php', classData, config);
};
