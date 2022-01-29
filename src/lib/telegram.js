const axios = require('axios');
const { getAvailableTickers } = require('./kraken');
const { getTweetsByUsername } = require('./twitter');

const { getRandomNumber } = require('./utils');

const sendMessage = async (chatId, text) => {

  // api token is saved in AWS SSM for security reasons
  const token = process.env.TELEGRAM_BOT_API_KEY;

  const baseUrl = 'https://api.telegram.org/bot';
  const method = 'sendMessage';
  const url = `${baseUrl}${token}/${method}?chat_id=${chatId}&text=${text}`;

  await axios.get(url);
};

const sendDefaultMessage = async (chatId) => {

  const messages = [
    'Cool story bro, needs more dragons.',
    'Kthxbye',
    'Good to know',
    'Svasta',
    'No vela',
    'Noro',
    'Bananas',
    'блин!',
    'Apparently I am still working',
    'Hi, I am bot'
  ];

  // select a random message from the list
  const message = messages[getRandomNumber(0, messages.length - 1)];

  await sendMessage(chatId, message);
};

const sendTweetsMessage = async (chatId, arg) => {
  const tweets = (await getTweetsByUsername(arg))
    .map(tweet => ({
      ...tweet,
      url: `https://twitter.com/${arg}/status/${tweet.id}`
    }));

  console.log('DEBUG', JSON.stringify(tweets));

  const messages = tweets.map(tweet => sendMessage(chatId, JSON.stringify(tweet)));
  await Promise.all(messages);
};

const sendTickersMessage = async (chatId, arg) => {

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

const sendErrorMessage = async (chatId, error) => {
  await sendMessage(chatId, error);
};

module.exports = {
  sendMessage,
  sendDefaultMessage,
  sendErrorMessage,
  sendTickersMessage,
  sendTweetsMessage
};
