import { Pool } from 'pg';
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    db: Pool;

    jwt: {
      sign: (payload: object, options?: object) => string;
      verify: (token: string, options?: object) => object;
      decode: (token: string) => null | { [key: string]: any } | string;
    };

    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
