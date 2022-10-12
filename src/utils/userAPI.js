import axios from 'axios';

const base_url = 'http://localhost/classroom-api';
const route = '/api/users';

export const login = async (userData) => {
  return await axios.post(base_url + route + '/login.php', userData);
};

export const register = async (userData) => {
  return await axios.post(base_url + route + '/register.php', userData);
};

export const getRole = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(base_url + route + '/role/get.php', config);
};
