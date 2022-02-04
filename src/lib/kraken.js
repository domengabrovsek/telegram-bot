const axios = require('axios');


// https://docs.kraken.com/rest/#operation/getTickerInformation
const getTickerInfo = async (ticker) => {
  const url = `https://api.kraken.com/0/public/Ticker?pair=${ticker}`;
  const result = await axios.get(url);
  return result;
};





module.exports = {
  getAvailableTickers,
  getTickerInfo
};
