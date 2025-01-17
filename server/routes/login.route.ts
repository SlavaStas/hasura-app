import { FastifyInstance } from 'fastify';
import { verifyPassword } from '../utils/auth';

export default async function loginRoute(server: FastifyInstance) {
  server.post<{
    Body: {
      email: string;
      password: string;
    };
  }>('/login', async (request, reply) => {
    const { email, password } = request.body;

    try {
      const result = await server.db.query(
        'SELECT id, password, role FROM "user" WHERE email = $1',
        [email]
      );

      if (result.rowCount === 0) {
        return reply.status(404).send({ message: 'User not found' });
      }

      const user = result.rows[0];

      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        return reply.status(401).send({ message: 'Invalid password' });
      }

      const token = server.jwt.sign({ userId: user.id, role: user.role });
      return { token };
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });
}
