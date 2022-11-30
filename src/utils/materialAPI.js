import axios from 'axios';
import { config } from './userAPI';

const base_url = 'http://localhost/classroom-api';
const route = '/api/material';

export const createSection = async (token, sectionData) => {
  return await axios.post(
    base_url + route + '/create_section.php',
    sectionData,
    config(token)
  );
};

export const getSections = async (token, classID) => {
  return await axios.get(
    base_url + route + `/sections.php?class_id=${classID}`,
    config(token)
  );
};

export const uploadMaterial = async (token, formData) => {
  return await axios.post(
    base_url + route + '/upload.php',
    formData,
    config(token)
  );
};
