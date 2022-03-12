const Binance = require('node-binance-api');
const options = { APIKEY: process.env.BINANCE_API_KEY, APISECRET: process.env.BINANCE_SECRET_KEY };
const binance = new Binance().options(options);

const { round } = require('mathjs');

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

const getPortfolioValue = async () => {

  const balances = await getBalances();
  const tokens = Object.keys(balances);
  const prices = await getPrices(tokens);

  const portfolio = tokens
    .map(token => {

      // price of token in main currency (EUR)
      const price = parseFloat(prices[Object.keys(prices).find(key => key.includes(token))]);

      // token balance
      const amount = round(balances[token], 4);

      // value of total tokens in main currency (EUR)
      const value = round(price * amount, 4);

      return { token, price, amount, value };
    });

  return portfolio;
};

module.exports = { getPortfolioValue };
