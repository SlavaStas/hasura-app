import Fastify from 'fastify';
import registerRoute from './routes/register.route';
import loginRoute from './routes/login.route';
import jwtPlugin from './plugins/jwt.plagin';
import dbPlugin from './plugins/db.plugin';
import uploadImgRoute from './routes/upload-images.route';

const buildServer = async () => {
  const server = Fastify({ logger: true });

  // Plugins
  await server.register(dbPlugin);
  await server.register(jwtPlugin);

  // Routes
  await server.register(registerRoute, { prefix: '/api' });
  await server.register(loginRoute, { prefix: '/api' });
  await server.register(uploadImgRoute, { prefix: '/graphql' });

  return server;
};

const startServer = async () => {
  const server = await buildServer();

  try {
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || 'localhost';

    await server.listen({
      port: Number(PORT),
      host: HOST,
    });

    console.log(`Listening on url ${HOST}:${PORT}...`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
