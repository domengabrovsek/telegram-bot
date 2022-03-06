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
      const balance = balances[token];

      // value of total tokens in main currency (EUR)
      const value = parseFloat(price) * parseFloat(balance);

      // rounded value to 2 decimals
      const rounded = Math.round(value * 100) / 100;

      return { token, balance, value, rounded };
    });

  return portfolio;
};
