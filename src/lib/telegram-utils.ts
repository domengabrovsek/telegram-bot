import { sendDefaultMessage, sendMessage, sendMessageWithInlineKeyboard } from "../services/telegram-service";
import { TelegramCallbackQuery, TelegramInlineKeyboard, TelegramInlineKeyboardButton, TelegramInput, TelegramMessage, TelegramMethod } from "../types/telegram";

export const getChatId = () => process.env.TELEGRAM_USER_ID as string;

// chatId and userId are the same thing
export const getUrl = (method: TelegramMethod) => {
  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;
  return `${baseUrl}${apiKey}/${method}`;
}

export const createTelegramInlineKeyboard = (buttons: TelegramInlineKeyboardButton[]): TelegramInlineKeyboard => {
  return { inline_keyboard: [buttons] }
}

export const getUserId = (input: TelegramInput) => {

  const userId =
    input?.message?.from?.id ||
    input?.callback_query?.from.id;

  return userId;
}

export const handleMessage = (input: TelegramMessage) => {

  const text = input.text;

  switch (text) {
    case 'keyboard': {
      sendMessageWithInlineKeyboard()
      break;
    }
    default: {
      sendDefaultMessage(text);
      break;
    }
  }
}

export const handleCallbackQuery = (input: TelegramCallbackQuery) => {
  const callbackQueryType = input.data;

  switch (callbackQueryType) {
    case 'portfolio': {

      const message = 'This will start working when you implement integrations to fetch portfolio';
      sendMessage(message);

      break;
    }

    default: {
      sendMessage('Callback query type not supported.');
    }
  }
}