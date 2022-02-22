const { sendMessage } = require('../lib/telegram');
const { getMessage } = require('./GmailApiService');

const handleGmailMessage = async (chatId, arg) => {

  const query = arg;
  const message = await getMessage(query);

  await sendMessage(chatId, JSON.stringify(message));
};

module.exports = { handleGmailMessage };
