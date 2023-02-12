import fastify from "fastify";
import cors from "@fastify/cors";
import health from "fastify-healthcheck";
import helmet from "@fastify/helmet";

import { authMiddleware } from "./middleware/authMiddleware";
import { sendMessage } from "./services/telegram-service";

import * as dotenv from 'dotenv';
import { TelegramInput } from "./types/telegram";
dotenv.config();

const server = fastify({ logger: true });

server.register(cors);
server.register(health);
server.register(helmet);

// register auth middleware to run before every request
server.addHook('preHandler', authMiddleware);

server.get("/", function (request, reply) {
  reply.code(200).send({ status: 'ok' });
});

server.post("/bot", async (request, reply) => {

  const input = request.body as TelegramInput;

  console.log(JSON.stringify(request.body));

  const { text } = input.message;
  sendMessage(text);

  reply.code(200).send({});
});

server.listen({ port: 3000, host: '0.0.0.0' });