const { sendMessage } = require('../lib/telegram');
const { getTweetsByUsername } = require('./TwitterApiService');

const sendTweetsMessage = async (chatId, arg) => {
  const tweets = (await getTweetsByUsername(arg))
    .map(tweet => `https://twitter.com/${arg}/status/${tweet.id}`);

  const messages = tweets
    .map(tweet => sendMessage(chatId, JSON.stringify(tweet)));

  await Promise.all(messages);
};

const handleTwitterMessage = async (chatId, arg) => {
  await sendTweetsMessage(chatId, arg);
};

module.exports = {
  handleTwitterMessage
};
