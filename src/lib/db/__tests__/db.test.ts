import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '../index';

describe('Database Operations', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create and retrieve a user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test-crud@example.com',
        name: 'CRUD Test User',
        hashedPassword: 'test-hash',
      },
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('test-crud@example.com');

    const retrievedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(retrievedUser).toBeDefined();
    expect(retrievedUser?.email).toBe(user.email);

    await prisma.user.delete({
      where: { id: user.id },
    });
  });

  it('should create and retrieve a post', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test-post@example.com',
        name: 'Post Test User',
        hashedPassword: 'test-hash',
      },
    });

    const post = await prisma.post.create({
      data: {
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        content: 'Test content',
        image: 'https://example.com/image.jpg',
        category: 'Test',
        tags: ['test'],
        readTime: '1 min',
        published: true,
        authorId: user.id,
      },
    });

    expect(post).toBeDefined();
    expect(post.title).toBe('Test Post');

    const retrievedPost = await prisma.post.findUnique({
      where: { id: post.id },
      include: { author: true },
    });

    expect(retrievedPost).toBeDefined();
    expect(retrievedPost?.author.email).toBe(user.email);

    await prisma.post.delete({
      where: { id: post.id },
    });
    await prisma.user.delete({
      where: { id: user.id },
    });
  });
});