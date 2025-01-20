import { FastifyInstance } from 'fastify';
import axios from 'axios';

export default async function uploadImgRoute(server: FastifyInstance) {

  server.post<{
    Body: { image: string };
  }>('/upload', async (request, reply) => {
    const { image } = request.body;

    if (!image) {
      return reply.code(400).send({ error: 'File is required' });
    }
    try {
      /** upload to imgur, but I made mock url **/

      return { url: `http://server/${image}` };
    } catch (error) {
      console.error('Image upload failed:', error);
      return reply.code(500).send({ error: 'Failed to upload image' });
    }
  });
}