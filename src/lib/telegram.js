const axios = require('axios');
const { getAvailableTickers } = require('./kraken');
const { getSymbolInfo } = require('./finnhub');
const { getRandomNumber } = require('./utils');

// api token is saved in AWS SSM for security reasons
const token = process.env.TELEGRAM_BOT_API_KEY;
const baseUrl = 'https://api.telegram.org/bot';

const sendMessage = async (chatId, text) => {

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

const sendStockMessage = async (chatId, arg) => {
  const stockInfo = await getSymbolInfo(arg.toUpperCase());

  let message = 'Here is the stock info:\n\n';
  message += `Name: ${stockInfo.name}\n`;
  message += `Current price: ${stockInfo.current}$\n`;
  message += `Today's opening price: ${stockInfo.open}$\n`;
  message += `Today's range: ${stockInfo.low}-${stockInfo.high}$\n`;
  message += `Change from yesterday: ${stockInfo.change}$ (${stockInfo.percentChange}%)\n`;

  await sendMessage(chatId, message);
};

const sendErrorMessage = async (chatId, error) => {
  await sendMessage(chatId, error);
};

const getListOfCommands = async () => {
  const method = 'getMyCommands';
  const url = `${baseUrl}${token}/${method}`;
  const result = await axios.get(url);
  return result.data.result;
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
  sendErrorMessage,
  sendTickersMessage,
  sendStockMessage,
  sendCommandsMessage
};
