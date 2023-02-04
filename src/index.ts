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
  reply.code(200).send({ status: 'ok' });
});

server.post("/bot", async (request, reply) => {

  console.log(request.body);

  const body = request.body as any;
  const chatId = body?.message?.chat?.id;
  const text = body?.message?.text.toLowerCase();
  const url = `${process.env.BASE_URL}${process.env.API_KEY}/sendMessage?chat_id=${chatId}&text=${encodeURI(text)}`;

  await fetch(url);

  reply.code(200).send({});
});

server.listen(3000, '0.0.0.0');