import { getUserId } from "../lib/telegram-utils";
import { sendMessage } from "../services/telegram-service";

export const authMiddleware = async (request: any, reply: any, next: any) => {

  console.log('RECEIVED REQUEST:', JSON.stringify(request.body));

  const allowedUserId = process.env.TELEGRAM_USER_ID;
  const userId = getUserId(request.body);
  const username = request?.body?.message?.chat?.username;

  if (userId != allowedUserId) {
    const text = `Sorry ${username} you are not authorized to use this bot. :(`;
    sendMessage(text);

    reply.code(401).send({ error: 'Unauthorized' });
    return;
  }

  // if user is allowed to interact with the API
  next();
};
