import fp from 'fastify-plugin';
import { fastifyJwt } from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const jwtPlugin = fp(async (server: FastifyInstance) => {
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret',
    sign: {
      expiresIn: '1h',
    },
  });

  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      console.error(error);
    }
  });
});

export default jwtPlugin;
