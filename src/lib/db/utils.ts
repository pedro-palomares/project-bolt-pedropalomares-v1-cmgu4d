import { prisma } from './client';

export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function clearTestData() {
  if (process.env.NODE_ENV === 'test') {
    await prisma.session.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
  }
}