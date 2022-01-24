const axios = require('axios');

const sendText = async (chatId, text) => {

  // api token is saved in AWS SSM for security reasons
  const token = process.env.TELEGRAM_BOT_API_KEY;

  const baseUrl = 'https://api.telegram.org/bot';
  const method = 'sendMessage';
  const url = `${baseUrl}${token}/${method}?chat_id=${chatId}&text=${text}`;

  return await axios.get(url);
}

module.exports = { sendText };
