const axios = require('axios');

const baseUrl = 'https://finnhub.io/api/v1';
const token = process.env.FINNHUB_TOKEN;
const options = {
  headers: {
    'X-Finnhub-Token': token
  }
};

const getSymbolInfo = async (symbol) => {
  const url = `${baseUrl}//quote?symbol=${symbol}`;
  const result = await axios.get(url, options);
  return result.data;
};

module.exports = {
  getSymbolInfo
};
