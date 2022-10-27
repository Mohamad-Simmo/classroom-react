import axios from 'axios';
import { config } from './userAPI';

const base_url = 'http://localhost/classroom-api';
const route = '/api/people';

export const getPeople = async (token, classID) => {
  return await axios.get(
    base_url + route + '/get.php?class_id=' + classID,
    config(token)
  );
};

export const addPeople = async (token, peopleData) => {
  return await axios.post(
    base_url + route + '/add.php',
    peopleData,
    config(token)
  );
};
