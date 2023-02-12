export const setRequestType = async (request: any, reply: any, next: any) => {

  if (request?.body?.message) {
    request.body.type = 'message';
  }

  else if (request?.body?.callback_query) {
    request.body.type = 'callbackQuery';
  }

  next();
};