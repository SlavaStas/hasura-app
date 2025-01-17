import bcrypt from 'bcrypt';
import jwt from '@fastify/jwt';
import { FastifyRequest } from 'fastify';
import { Role } from '../enums/role';

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const authorize = (request: FastifyRequest, role: Role) => {
  console.log(request.user);
  if ((request.user as { role: Role }).role !== role) {
    throw new Error('Permission denied');
  }
};
