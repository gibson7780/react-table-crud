import api from './api';

export const fetchData = async (endpoint) => {
  let response = [];

  try {
    response = await api.get(endpoint);
  } catch (err) {
    // console.log('Error caught with GET request:', err);
    return err;
  }

  return response.data;
};

export const postData = async (endpoint, payload) => {
  let response = [];

  try {
    response = await api.post(endpoint, payload);
  } catch (err) {
    // console.log('Error caught with GET request:', err);
    return err;
  }

  return response.data;
};
