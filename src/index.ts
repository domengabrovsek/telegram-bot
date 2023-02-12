import fastify from "fastify";
import cors from "@fastify/cors";
import health from "fastify-healthcheck";
import helmet from "@fastify/helmet";

import { authMiddleware } from "./middleware/authMiddleware";
import { sendMessage } from "./services/telegram-service";

import * as dotenv from 'dotenv';
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

  console.log(request.body);

  const body = request.body as any;
  const text = body?.message?.text;

  sendMessage(text);

  reply.code(200).send({});
});

server.listen({ port: 3000, host: '0.0.0.0' });