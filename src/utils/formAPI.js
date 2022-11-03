import axios from 'axios';
import { config } from './userAPI';

const base_url = 'http://localhost/classroom-api';
const route = '/api/forms';

export const createForm = async (token, formData) => {
  return await axios.post(
    base_url + route + '/create.php',
    formData,
    config(token)
  );
};

export const getForms = async (token) => {
  return await axios.get(base_url + route + '/get.php', config(token));
};

export const getForm = async (token, formID) => {
  return await axios.get(
    base_url + route + `/get_single.php?id=${formID}`,
    config(token)
  );
};

export const deleteForm = async (token, formID) => {
  const { headers } = config(token);
  return await axios.delete(base_url + route + '/delete.php', {
    headers,
    data: { form_id: formID },
  });
};
