type TelegramChatType = 'private';
type TelegramEntityType = 'bot_command';
type TelegramLanguageCode = 'en';
type TelegramInputType = 'message' | 'callbackQuery';

type TelegramEntity = {
  offset: number,
  length: number,
  type: TelegramEntityType
};

type TelegramFrom = {
  id: number,
  is_bot: boolean,
  first_name: string,
  last_name: string,
  username: string,
  language_code: TelegramLanguageCode
};

type TelegramChat = {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  type: TelegramChatType
};

export type TelegramMessage = {
  message_id: number,
  from: TelegramFrom,
  chat: TelegramChat,
  date: number,
  text: string,
  reply_markup?: ReplyMarkup,
  entities?: TelegramEntity[]
};

export type TelegramInlineKeyboardButton = {
  text: string,
  callback_data: TelegramCallbackDataType
}

type TelegramInlineKeyboardRow = TelegramInlineKeyboardButton[];

type ReplyMarkup = TelegramInlineKeyboard | undefined;

export type SendMessageRequest = {
  chat_id: string,
  text: string,
  reply_markup?: ReplyMarkup
};

export type TelegramCommand = {
  command: string,
  description: string
}

export type TelegramInlineKeyboard = {
  inline_keyboard: TelegramInlineKeyboardRow[]
};

export type TelegramCallbackQuery = {
  id: string,
  from: TelegramFrom,
  message: TelegramMessage,
  chat_instance: 'string',
  data: TelegramCallbackDataType
}

export type TelegramInput = {
  update_id: number,
  type: TelegramInputType,
  message?: TelegramMessage,
  callback_query?: TelegramCallbackQuery
}

export enum TelegramMethod {
  SendMessage = 'sendMessage'
}

export type TelegramCallbackDataType = 'portfolio';

export enum TelegramCallbackDataTypeEnum {
  Portfolio = 'portfolio'
}