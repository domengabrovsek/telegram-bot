const { round } = require('mathjs');

const Client = require('./ApiClient');

const getBalances = async () => {

  const response = await Client.getBalances();

  // remove zero balances
  const balances = Object.fromEntries(Object.keys(response)
    .filter(key => response[key] > 0)
    .map(key => ([key, response[key]])));

  return balances;
};

const getAllAssetPairs = async () => {
  const response = await Client.getAssetPairs();
  return Object.keys(response);
};

const getAssetPairs = async (tickers) => {
  // get all asset pairs from kraken
  const allAssetPairs = await getAllAssetPairs();

  const assetPairs = allAssetPairs
    // take just pairs with EUR
    .filter(pair => pair.includes('EUR'))
    // remove all fiat-fiat pairs
    .filter(pair => {
      const [, fiat] = pair.split('EUR');
      return Boolean(!fiat);
    });

  const matchedAssetPairs = tickers
    .map(ticker => assetPairs.find(pair => {
      const [crypto] = pair.split('EUR');
      return crypto.includes(ticker);
    }))
    .filter(Boolean);

  return matchedAssetPairs;
};

const getTickerPrice = async (pair) => {

  const options = { pair };
  const response = await Client.getTicker(options);

  return response;
};

const getPrices = async (tickers) => {

  const assetPairs = await getAssetPairs(tickers);
  const response = await Promise.all(assetPairs.map(pair => getTickerPrice(pair)));

  const prices = response
    .map(res => {
      const key = Object.keys(res)[0];
      const prices = {
        ask: res[key].a[0],
        bid: res[key].b[0],
      };
      return [key, prices.ask];
    });

  return Object.fromEntries(prices);
};

const getPortfolioValue = async () => {

  // get balances for all owned tokens
  const balances = await getBalances();
  const tokens = Object.keys(balances);

  // get prices for all owned tokens
  const prices = await getPrices(tokens);

  // assemble portfolio
  const portfolio = tokens
    .map(token => {

      const key = Object.keys(prices).find(key => key.includes(token));

      // price of token in main currency
      const price = parseFloat(prices[key]);

      const amount = round(balances[token], 4);

      const value = round(price * amount, 4);

      return { token, price, amount, value };
    })
    // filter out all tokens with 0 value in fiat currency
    .filter(token => token.value > 0);

  return portfolio;
};

module.exports = { getPortfolioValue };
