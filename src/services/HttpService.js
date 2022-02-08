const axios = require('axios');

const get = async (url, options) => {
  const result = await axios.get(url, options);
  return result.data;
};

const post = async (url, data, options) => {
  const result = await axios.post(url, data, options);
  return result;
};

module.exports = { get, post };
