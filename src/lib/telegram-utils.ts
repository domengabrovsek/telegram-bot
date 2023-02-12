import { TelegramInlineKeyboard, TelegramInlineKeyboardButton, TelegramMethod } from "../types/telegram";

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