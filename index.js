// load environment variables
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

console.log('Starting bot.')

let intervalId;

bot.on('message', (msg) => {
  
  const from = msg.from.first_name;

  if(from === 'Daria') {
    bot.sendMessage(msg.chat.id, 'Oh hi Dashkin! You are the best! <3');
  } else {
    bot.sendMessage(msg.chat.id, `Thank you for your message ${msg.from.first_name}`);
  }

})

bot.onText(/start/, (msg, match) => {
  const fromId = msg.from.id;
  const chatId = msg.chat.id;

  console.log('Setting up interval to remind Milan to commit more often');

  bot.sendMessage(chatId, `I will now start to spam Milan.`);
  intervalId = setInterval(() => bot.sendMessage(chatId, `Milan are you ready for some annoying bot stuff? Muahahaha`), 5000);
});

bot.onText(/stop/, (msg, match) => {
  const fromId = msg.from.id;
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'I guess Milan is tired of this shit already, I will stop it for now');
  clearInterval(intervalId);
});
