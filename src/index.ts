import fastify from "fastify";
import cors from "@fastify/cors";
import health from "fastify-healthcheck";
import helmet from "@fastify/helmet";

import { authMiddleware } from "./middleware/authMiddleware";
import { setRequestType } from "./middleware/setRequestType";

import { TelegramCallbackQuery, TelegramInput, TelegramMessage } from "./types/telegram";
import { handleCallbackQuery, handleMessage } from "./lib/telegram-utils";

import * as dotenv from 'dotenv';
dotenv.config();

const server = fastify({ logger: true });

server.register(cors);
server.register(health);
server.register(helmet);

// set request type before running main handler logic
server.addHook('preHandler', setRequestType);

// register auth middleware to run before every request
server.addHook('preHandler', authMiddleware);

server.get("/", function (request, reply) {
  reply.code(200).send({ status: 'ok' });
});

server.post("/bot", async (request, reply) => {

  const input = request.body as TelegramInput;

  switch (input.type) {
    case 'message': {
      handleMessage(input.message as TelegramMessage);
      break;
    }
    case 'callbackQuery': {
      handleCallbackQuery(input.callback_query as TelegramCallbackQuery);
      break;
    }
    default: {
      throw new Error('Unsupported input type!');
    }
  }

  reply.code(200).send({});
});

server.listen({ port: 3000, host: '0.0.0.0' });