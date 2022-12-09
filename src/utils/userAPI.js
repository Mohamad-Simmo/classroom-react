import axios from 'axios';

const base_url = 'http://localhost/classroom-api';
const route = '/api/users';

export const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const login = async (userData) => {
  return await axios.post(base_url + route + '/login.php', userData);
};

export const register = async (userData) => {
  return await axios.post(base_url + route + '/register.php', userData);
};

