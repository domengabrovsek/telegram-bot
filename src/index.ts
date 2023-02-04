import fastify from "fastify";
import cors from "@fastify/cors";
import health from "fastify-healthcheck";
import helmet from "@fastify/helmet";

const server = fastify({
  logger: true
});

server.register(cors);
server.register(health);
server.register(helmet);

server.get("/", function (request, reply) {
  reply.code(200).send({
    hello: 'world-latest',
    for: "real"
  });
});

server.post("/bot", function (request, reply) {
  reply.code(200).send(request.body);
});

server.get("/bot", function (request, reply) {
  reply.code(200).send(request);
});

server.listen(3000, '0.0.0.0');