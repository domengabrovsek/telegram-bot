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

  let message = 'Here is the info about your crypto portfolio:\n\n';

  // for each exchange
  Object.keys(portfolio).forEach(exchange => {
    message += `${exchange} \n`;

    // for each token on exchange
    portfolio[exchange].forEach(({ token, balance, value }) => {
      message += `${balance}${token} is worth ${value}${process.env.MAIN_CURRENCY}\n`;
    });
  });

  await sendMessage(chatId, message);

};

module.exports = { getTotalPortfolio, handleCryptoMessage };
