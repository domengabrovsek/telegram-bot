const axios = require('axios');

const get = async (url, options) => {
  const result = await axios.get(url, options);
  return result.data;
};

module.exports = { get };
