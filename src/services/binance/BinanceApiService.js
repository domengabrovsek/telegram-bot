const { getBalances, getPrices } = require('./BinanceApiClient');
const { round } = require('mathjs');

const getPortfolio = async () => {

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

  const totalValue = round(portfolio.reduce((sum, curr) => sum + curr.value, 0), 4);

  return { exchange: 'Binance', portfolio, totalValue };
};

module.exports = { getPortfolio };
