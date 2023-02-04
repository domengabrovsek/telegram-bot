import fastify from 'fastify';

const app = fastify({
  logger: true
});

app.get('/', async (request, reply) => {
  reply.send({ message: 'Hello, World!' });
});

const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()