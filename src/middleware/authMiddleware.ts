import { sendMessage } from "../services/message-service";

export const authMiddleware = async (request: any, reply: any, next: any) => {

  const allowedUserId = process.env.TELEGRAM_USER_ID;
  const userId = request?.body?.message?.chat?.id;
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
