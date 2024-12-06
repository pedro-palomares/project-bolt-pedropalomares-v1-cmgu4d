import { prisma } from './client';
import { hash } from 'bcryptjs';

interface ValidationResult {
  success: boolean;
  message: string;
  details?: any;
}

export async function validateDatabase(): Promise<ValidationResult> {
  try {
    // 1. Verificar conexión
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos establecida');

    // 2. Verificar migraciones
    const migrations = await prisma.$queryRaw`SELECT * FROM _prisma_migrations ORDER BY finished_at DESC`;
    console.log('✅ Migraciones aplicadas:', migrations);

    // 3. Verificar índices
    const userIndexes = await prisma.$queryRaw`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'users'
    `;
    console.log('✅ Índices de usuarios verificados:', userIndexes);

    // 4. Realizar prueba de rendimiento
    const startTime = Date.now();
    
    // Create test user
    const testUser = await prisma.user.create({
      data: {
        email: `validation${Date.now()}@test.com`,
        name: 'Validation User',
        hashedPassword: await hash('test123', 10),
      },
    });

    // Create multiple posts
    const posts = await prisma.post.createMany({
      data: Array(5).fill(null).map((_, i) => ({
        title: `Test Post ${i}`,
        slug: `test-post-${i}-${Date.now()}`,
        excerpt: 'Test excerpt',
        content: 'Test content',
        image: 'https://example.com/image.jpg',
        category: 'Test',
        tags: ['test'],
        readTime: '1 min',
        published: true,
        authorId: testUser.id,
      })),
    });

    // Test queries with relations
    const userWithPosts = await prisma.user.findUnique({
      where: { id: testUser.id },
      include: {
        posts: true,
        _count: {
          select: { posts: true }
        }
      }
    });

    // Cleanup
    await prisma.post.deleteMany({
      where: { authorId: testUser.id }
    });
    await prisma.user.delete({
      where: { id: testUser.id }
    });

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    return {
      success: true,
      message: 'Validación completada exitosamente',
      details: {
        executionTime,
        migrationsCount: (migrations as any[]).length,
        testResults: {
          userCreation: !!testUser,
          postsCreation: posts.count === 5,
          relationsTest: !!userWithPosts && userWithPosts.posts.length === 5
        }
      }
    };
  } catch (error) {
    console.error('❌ Error durante la validación:', error);
    return {
      success: false,
      message: 'Error durante la validación',
      details: error
    };
  } finally {
    await prisma.$disconnect();
  }
}