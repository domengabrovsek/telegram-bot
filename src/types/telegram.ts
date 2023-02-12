type TelegramChatType = 'private';
type TelegramEntityType = 'bot_command';
type TelegramLanguageCode = 'en';

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

type TelegramMessage = {
  message_id: number,
  from: TelegramFrom,
  chat: TelegramChat,
  date: number,
  text: string,
  entities: TelegramEntity[]
};

type TelegramCallbackDataType = 'portfolio';

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

export type TelegramInput = {
  update_id: number,
  message: TelegramMessage
};

export enum TelegramMethod {
  SendMessage = 'sendMessage'
}