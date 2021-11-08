// load environment variables
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

console.log('Starting bot.')

// this interval id is used so we can clear it later with clearInterval to stop continuous messages
let intervalId;

// run this on every receives message
bot.on('message', (msg) => {

  const from = msg.from.first_name;

  // a special message for my wife
  if (from === 'Daria') {
    bot.sendMessage(msg.chat.id, 'Oh hi Dashkin! You are the best! <3');
  } else {
    bot.sendMessage(msg.chat.id, `Thank you for your message ${msg.from.first_name}`);
  }
})

// run this when /start is sent as message
bot.onText(/start/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `I will now start to spam Milan.`);

  // send a message every 5000ms
  intervalId = setInterval(() => bot.sendMessage(chatId, `Milan are you ready for some annoying bot stuff? Muahahaha`), 5000);
});

// run this when /stop is sent as message
bot.onText(/stop/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'I guess Milan is tired of this shit already, I will stop it for now');
  clearInterval(intervalId);
});
