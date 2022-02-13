const { sendDefaultMessage, sendCommandsMessage } = require('../lib/telegram');
const { handleTwitterMessage } = require('../services/TwitterService');
const { handleKrakenMessage } = require('../services/KrakenService');
const { handleStockMessage } = require('../services/FinnhubService');

module.exports.handler = async (event) => {

  try {

    // debug info
    console.log('DEBUG EVENT', JSON.stringify(event));

    const body = JSON.parse(event.body);
    const chatId = body?.message?.chat?.id;
    const text = body?.message?.text.toLowerCase();

    // split command from arguments
    const [command, arg] = text.split(' ');

    // perform action based on what user input
    switch (command) {

      case '/commands': {
        await sendCommandsMessage(chatId);
        break;
      }
      case '/tokens': {
        await handleKrakenMessage(chatId, arg);
        break;
      }
      case '/twitter': {
        await handleTwitterMessage(chatId, arg);
        break;
      }
      case '/stocks': {
        await handleStockMessage(chatId, arg);
        break;
      }
      default: {
        await sendDefaultMessage(chatId);
      }
    }

    return { statusCode: 200 };

  } catch (error) {
    console.log('DEBUG ERROR', JSON.stringify(error));
    return { statusCode: 200 };
  }
};
