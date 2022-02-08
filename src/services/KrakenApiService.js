const { get } = require('./HttpService');

const baseUrl = 'https://api.kraken.com/0';

// TODO: this will be used for private APIs
// const token = process.env.TWITTER_BEARER_TOKEN;
// const options = {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// };

const getTickerInfo = async (ticker) => {
  const url = `${baseUrl}/public/Ticker?pair=${ticker}`;
  const result = await get(url);
  return result;
};

module.exports = {
  getTickerInfo
};
