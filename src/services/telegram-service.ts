import { createTelegramInlineKeyboard, getChatId, getUrl } from "../lib/telegram-utils";
import { SendMessageRequest, TelegramCommand, TelegramInlineKeyboardButton, TelegramMethod } from "../types/telegram";

export const sendMessageWithInlineKeyboard = async () => {

  const url = getUrl(TelegramMethod.SendMessage);

  const buttons: TelegramInlineKeyboardButton[] = [
    { text: 'Get portfolio', callback_data: 'portfolio' },
  ];

  const data: SendMessageRequest = {
    chat_id: getChatId(),
    text: 'Choose an option:',
    reply_markup: createTelegramInlineKeyboard(buttons)
  };

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  console.log(`Sending message to ${url}, request: ${JSON.stringify(request)}`);

  await fetch(url, request);
};

export const sendMessage = async (text: string) => {

  const url = getUrl(TelegramMethod.SendMessage);
  const data: SendMessageRequest = { chat_id: getChatId(), text };

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  console.log(`Sending message to ${url}, request: ${JSON.stringify(request)}`);

  await fetch(url, request);
};

export const setCommands = async (commands: TelegramCommand[]) => {

  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;

  const url = `${baseUrl}${apiKey}/sendMessage?setMyCommands`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commands)
  })

  await sendMessage(`New commands set to ${commands}`);
};