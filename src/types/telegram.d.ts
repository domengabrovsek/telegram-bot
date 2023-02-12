export type TelegramCommand = {
  command: string,
  description: string
}

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

export type TelegramInput = {
  update_id: number,
  message: TelegramMessage
};
