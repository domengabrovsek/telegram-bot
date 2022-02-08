const { get } = require('../services/HttpService');
const { getRandomNumber } = require('./utils');

// api token is saved in AWS SSM for security reasons
const token = process.env.TELEGRAM_BOT_API_KEY;
const baseUrl = 'https://api.telegram.org/bot';

const sendMessage = async (chatId, text) => {

  const method = 'sendMessage';
  const url = `${baseUrl}${token}/${method}?chat_id=${chatId}&text=${text}`;

  await get(url);
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
    'Hi, I am bot',
    'Kad je Tito bio živ ...',
    'Kad sam ja bio tvojih godina ...',
    'телеграм бот ***** тебя в рот!'
  ];

  // select a random message from the list
  const randomIndex = getRandomNumber(0, messages.length - 1);
  const message = messages[randomIndex];

  await sendMessage(chatId, message);
};

const getListOfCommands = async () => {
  const method = 'getMyCommands';
  const url = `${baseUrl}${token}/${method}`;
  const result = await get(url);
  return result.result;
};

const sendCommandsMessage = async (chatId) => {
  const commands = await getListOfCommands();

  let message = 'Here is a list of all current commands:\n';

  commands.forEach(item => {
    message += `/${item.command} - ${item.description}\n`;
  });

  await sendMessage(chatId, message);
};

module.exports = {
  sendMessage,
  sendDefaultMessage,
  sendCommandsMessage
};
