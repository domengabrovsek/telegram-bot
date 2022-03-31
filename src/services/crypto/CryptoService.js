const { sendMessage } = require('../../lib/telegram');
const Binance = require('../binance/BinanceApiService');
const Kraken = require('../kraken/KrakenApiService');

const getTotalPortfolio = () => {
  return Promise.all([Binance.getPortfolio(), Kraken.getPortfolio()]);
};

const handleCryptoMessage = async (chatId) => {

  const portfolios = await getTotalPortfolio();
  const currency = process.env.CURRENCY;

  let message = 'Here is the info about your crypto portfolio:\n\n';

  // for each exchange
  portfolios.forEach(({ exchange, portfolio, totalValue }) => {
    message += `\n${exchange}\n\n`;

    // for each token on exchange
    portfolio.forEach(({ token, amount, value, price }) => {
      message += `Token: ${token}\n`;
      message += `Current price: ${price}\n`;
      message += `Amount: ${amount}\n`;
      message += `Value: ${value}${currency}\n`;
      message += '\n';
    });

    message += `Total: ${totalValue}${currency}\n`;
    message += '\n****************************************\n';
  });

  await sendMessage(chatId, message);
};

module.exports = { getTotalPortfolio, handleCryptoMessage };
