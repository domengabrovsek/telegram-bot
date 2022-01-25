const axios = require('axios');

const { getRandomNumber } = require('./utils');

const sendText = async (chatId, text) => {

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

  await sendText(chatId, message);
}

module.exports = {
  sendText,
  sendDefaultMessage
};
