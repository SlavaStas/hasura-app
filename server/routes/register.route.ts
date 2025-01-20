import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { hashPassword } from '../utils/auth';
import { Role } from '../enums/role';

export default async function registerRoute(server: FastifyInstance) {
  server.post<{
    Body: {
      email: string;
      password: string;
      role: Role;
    }
  }>('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password, role } = request.body as {
      email: string;
      password: string;
      role: Role;
    };

    try {
      const existingUserQuery = 'SELECT id FROM users WHERE email = $1';
      const { rows: existingUser } = await server.db.query(existingUserQuery, [email]);

      if (existingUser.length > 0) {
        return reply.status(401).send({ message: 'User already exists' });
      }

      const hashedPassword = await hashPassword(password);

      const insertUserQuery = `
        INSERT INTO users (email, password, role) 
        VALUES ($1, $2, $3) 
        RETURNING id, email, role
      `;
      const { rows: [newUser] } = await server.db.query(insertUserQuery, [email, hashedPassword, role]);

      return reply.status(200).send({
        user: newUser,
        message: 'User created successfully!',
      });
    } catch (error) {
      console.error('Error during user registration:', error);
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });
}
