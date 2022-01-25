const { tickers } = require('./tickers');

const getAvailableTickers = (text) => {
  if (text) {
    return tickers.filter(ticker => ticker.includes(text));
  }

  return tickers;
};

module.exports = {
  getAvailableTickers
};
