const { sendMessage } = require('../lib/telegram');

const handleGmailMessage = async (chatId) => {
  await sendMessage(chatId, 'Not implemented yet');
};

module.exports = { handleGmailMessage };
