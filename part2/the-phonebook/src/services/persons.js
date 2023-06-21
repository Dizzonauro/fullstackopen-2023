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

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  removePerson: removePerson,
  update: update,
};
