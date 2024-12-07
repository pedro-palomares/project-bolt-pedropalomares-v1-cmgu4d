import { PrismaClient } from '@prisma/client';
import { logInfo, logError } from '../utils/logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function createUser(data: { 
  email: string; 
  name: string; 
  hashedPassword: string; 
}) {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        hashedPassword: data.hashedPassword,
      }
    });
    logInfo('Usuario creado correctamente', { userId: user.id });
    return user;
  } catch (error) {
    logError(error as Error, { context: 'Database - Create User' });
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email }
    });
  } catch (error) {
    logError(error as Error, { context: 'Database - Find User' });
    throw error;
  }
}

export async function createSession(data: {
  userId: string;
  token: string;
  expiresAt: Date;
}) {
  try {
    return await prisma.session.create({
      data
    });
  } catch (error) {
    logError(error as Error, { context: 'Database - Create Session' });
    throw error;
  }
}