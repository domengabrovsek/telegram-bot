const { sendMessage } = require('../../lib/telegram');
const { getPortfolioValue } = require('../binance/BinanceApiService');

const getTotalPortfolio = async () => {

  const portfolio = {
    binance: await getPortfolioValue()
  };

  return portfolio;
};

const handleCryptoMessage = async (chatId) => {

  const portfolio = await getTotalPortfolio();
  const currency = process.env.MAIN_CURRENCY;

  let message = 'Here is the info about your crypto portfolio:\n\n';

  // for each exchange
  Object.keys(portfolio).forEach(exchange => {
    message += `${exchange}\n\n`;

    // for each token on exchange
    portfolio[exchange].forEach(({ token, amount, value, price }) => {
      message += `Token: ${token}\n`;
      message += `Current price: ${price}\n`;
      message += `Amount: ${amount}\n`;
      message += `Value: ${value}${currency}\n`;
      message += '\n';
    });

    const total = portfolio[exchange].reduce((sum, curr) => sum + curr.value, 0);
    message += `Total: ${total}${currency}\n`;

  });

  await sendMessage(chatId, message);

};

module.exports = { getTotalPortfolio, handleCryptoMessage };
