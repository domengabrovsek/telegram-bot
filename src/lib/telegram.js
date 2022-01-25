const axios = require('axios');
const { getAvailableTickers } = require('./kraken');

const { getRandomNumber, formatArrayMessage } = require('./utils');

const sendMessage = async (chatId, text) => {

  // api token is saved in AWS SSM for security reasons
  const token = process.env.TELEGRAM_BOT_API_KEY;

  const baseUrl = 'https://api.telegram.org/bot';
  const method = 'sendMessage';
  const url = `${baseUrl}${token}/${method}?chat_id=${chatId}&text=${text}`;

  return await axios.get(url);
}

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
}

const sendTickersMessage = async (chatId, arg) => {

  const tickers = getAvailableTickers(arg);
  const message = `Here are the requested tokens: \n${formatArrayMessage(tickers)}`;

  await sendMessage(chatId, message);
}

const sendErrorMessage = async (chatId, error) => {
  await sendMessage(chatId, error);
}

module.exports = {
  sendMessage,
  sendDefaultMessage,
  sendErrorMessage,
  sendTickersMessage
};
