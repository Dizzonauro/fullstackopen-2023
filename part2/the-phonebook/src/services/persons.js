import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const removePerson = async (id) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .catch((error) => console.log('error:', error));
  return getAll();
};

export default {
  getAll: getAll,
  create: create,
  removePerson: removePerson,
};
