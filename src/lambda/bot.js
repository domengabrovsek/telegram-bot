const { sendDefaultMessage, sendTickersMessage } = require('../lib/telegram');

module.exports.handler = async (event) => {

  try {

    const body = JSON.parse(event.body);
    const { chat, text } = body?.message || {};

    // split command from arguments
    const [command, arg] = text.split(' ');

    console.log({ command, arg, text });

    // perform action based on what user input
    switch (command) {
      case '/tokens': {
        await sendTickersMessage(chat.id, arg);
        break;
      }
      default: {
        await sendDefaultMessage(chat.id);
      }
    }

    return { statusCode: 200 };

  } catch (error) {
    return { statusCode: 200 };
  }
};
