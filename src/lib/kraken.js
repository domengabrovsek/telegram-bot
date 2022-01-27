const axios = require('axios');
const tickers = require('./tickers');

// https://docs.kraken.com/rest/#operation/getTickerInformation
const getTickerInfo = async (ticker) => {
  const url = `https://api.kraken.com/0/public/Ticker?pair=${ticker}`;
  const result = await axios.get(url);
  return result;
};

const mapTickerInfo = (tickerResult) => {

  // there is always just one key (weird kraken structure)
  const key = Object.keys(tickerResult.data.result)[0];
  const values = tickerResult.data.result[key];

  const mappedInfo = {
    symbol: key,
    askPrice: values.a[0], // current
    bidPrice: values.b[0], // current
    volume: values.v[0], // today
    low: values.l[0], // today
    high: values.h[0] // today
  };

  return mappedInfo;
};

const getAvailableTickers = async (text) => {

  // currencies we are interested in right now
  const currencies = ['BTC', 'XBT', 'USD', 'EUR'];

  // list of tickers without any info
  const tickerList = text
    ? tickers.filter(ticker => ticker.includes(text))
    : tickers;

  // filter tickers with only provided currencies
  const filteredTickers = tickerList
    .filter(ticker => currencies
      .some(currency => ticker
        .includes(currency)));

  // map list of tickers to list of promises
  const promises = filteredTickers.map(item => getTickerInfo(item));

  // get info from kraken (in parallel)
  const results = await Promise.all(promises);

  // map results to some simplified format
  const tickersInfo = results.map(item => mapTickerInfo(item));

  return tickersInfo;
};

module.exports = {
  getAvailableTickers,
  getTickerInfo
};
