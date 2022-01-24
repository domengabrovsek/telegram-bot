const { sendText } = require('../utils/telegram');
const { getAvailableTickers } = require('../utils/kraken');

module.exports.handler = async (event) => {

  try {

    const body = JSON.parse(event.body);
    const { chat, text } = body?.message || {};

    // TODO: figure out how to rename commands to make some sense
    if (text.includes('/command1')) {

      const ticker = text.split(' ')?.[1];
      const tickers = getAvailableTickers(ticker)
      const message = 'Here are all pairs available on Kraken: \n' + tickers;

      await sendText(chat.id, message);
    } 
    
    // default message
    else {
      const message = 'I am just repeating after you.' + '\n' + text;
      await sendText(chat.id, message);
    }

    return { statusCode: 200 };

  } catch (error) {
    console.error(error);
    return { statusCode: 200 };
  }
};