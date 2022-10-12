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
