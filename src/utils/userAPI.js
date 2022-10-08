import axios from 'axios';

const base_url = 'http://localhost/classroom-api';

export const login = async (userData) => {
  return await axios.post(base_url + '/api/user/login.php', userData);
};
