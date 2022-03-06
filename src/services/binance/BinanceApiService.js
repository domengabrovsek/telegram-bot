const Binance = require('node-binance-api');
const options = { APIKEY: process.env.BINANCE_API_KEY, APISECRET: process.env.BINANCE_SECRET_KEY };
const binance = new Binance().options(options);

const mainCurrency = process.env.MAIN_CURRENCY || 'EUR';

const getBalances = async () => {
  const result = await binance.balance();

  return Object.fromEntries(
    Object.keys(result)
      .filter(key => parseFloat(result[key].available) > 0)
      .map(key => [key, result[key].available]));
};

const getPrices = async (tokens = []) => {
  const result = await binance.prices();

  const prices = Object.fromEntries(
    Object.keys(result)
      .filter(key => tokens.some(token => key.includes(token) && key.includes(mainCurrency)))
      .map(key => [key, result[key]]));

  return prices;
};

exports.getPortfolioValue = async () => {

  const balances = await getBalances();
  const tokens = Object.keys(balances);
  const prices = await getPrices(tokens);

  const portfolio = tokens
    .map(token => {

      // price of token in main currency (EUR)
      const price = prices[Object.keys(prices).find(key => key.includes(token))];

      // token balance
      const balance = Math.round(parseFloat(balances[token]) * 100) / 100;

      // value of total tokens in main currency (EUR)
      const value = Math.round(parseFloat(price) * parseFloat(balance) * 100) / 100;

      return { token, balance, value };
    });

  return portfolio;
};
