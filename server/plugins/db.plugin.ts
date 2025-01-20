import fp from 'fastify-plugin';
import { Pool } from 'pg';

const dbPlugin =  fp(async (fastify) => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hasura',
    password: 'postgres',
    port: 5432,
  });

  fastify.decorate('db', pool);

  fastify.addHook('onClose', (instance, done) => {
    pool.end().then(() => done())
    .catch((error) => done(error));
  });
});

export default dbPlugin;