export const sendMessage = async (text: string) => {

  const baseUrl = process.env.BASE_URL;
  const apiKey = process.env.API_KEY;

  // chatId and userId are the same thing
  const chatId = process.env.TELEGRAM_USER_ID;

  const url = `${baseUrl}${apiKey}/sendMessage?chat_id=${chatId}&text=${encodeURI(text)}`;

  await fetch(url);
};
