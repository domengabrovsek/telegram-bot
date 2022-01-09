const axios = require('axios');

const token = process.env.TELEGRAM_BOT_API_KEY;

async function sendToUser(chat_id, text) {
  return await axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`);
}

module.exports.handler = async event => {
  const body = JSON.parse(event.body);
  const { chat, text } = body.message;

  if (text) {
    let message = '';
    try {
      message = `Input: ${text}`;
    } catch (error) {
      message = `Input: ${text}, \nError: ${error.message}`;
    }

    await sendToUser(chat.id, message);
  } else {
    await sendToUser(chat.id, 'Text message is expected.');
  }

  return { statusCode: 200 };
};