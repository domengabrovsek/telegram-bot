const {
  sendDefaultMessage,
  sendStockMessage,
  sendCommandsMessage
} = require('../lib/telegram');

const { handleTwitterMessage } = require('../services/TwitterService');
const { handleKrakenMessage} = require('../services/KrakenService');

module.exports.handler = async (event) => {

  try {

    const body = JSON.parse(event.body);
    const { chat, text } = body?.message || {};

    // split command from arguments
    const [command, arg] = text.split(' ');

    console.log({ command, arg, text });

    // perform action based on what user input
    switch (command) {

      case '/commands': {
        await sendCommandsMessage(chat.id);
        break;
      }
      case '/tokens': {
        await handleKrakenMessage(chat.id, arg);
        break;
      }
      case '/twitter': {
        await handleTwitterMessage(chat.id, arg);
        break;
      }
      case '/stocks': {
        await sendStockMessage(chat.id, arg);
        break;
      }
      default: {
        await sendDefaultMessage(chat.id);
      }
    }

    return { statusCode: 200 };

  } catch (error) {
    console.log(error);
    return { statusCode: 200 };
  }
};
