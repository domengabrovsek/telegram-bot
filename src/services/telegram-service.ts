import { TelegramCommand } from "../types/telegram";

export const sendMessage = async (text: string) => {

  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;

  // chatId and userId are the same thing
  const chatId = process.env.TELEGRAM_USER_ID;

  const url = `${baseUrl}${apiKey}/sendMessage?chat_id=${chatId}&text=${encodeURI(text)}`;

  await fetch(url);
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
}