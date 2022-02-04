const tickers = require('../data/tickers');
const { getTickerInfo } = require('./KrakenApiService');
const { sendMessage } = require('../lib/telegram');

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

const handleKrakenMessage = async (chatId, arg) => {

  const tickers = await getAvailableTickers(arg.toUpperCase());
  let message = 'Here are the requested tokens: \n';

  tickers.forEach(ticker => {
    message += '************************\n';
    message += `* Ticker: ${ticker.symbol}\n`;
    message += `* Ask price: ${ticker.askPrice}\n`;
    message += `* Bid price: ${ticker.bidPrice}\n`;
    message += `* Volume: ${ticker.volume}\n`;
    message += `* Low: ${ticker.low}\n`;
    message += `* High: ${ticker.high}\n`;
    message += '************************\n';
  });

  await sendMessage(chatId, message);
};

module.exports = {
  handleKrakenMessage
};
