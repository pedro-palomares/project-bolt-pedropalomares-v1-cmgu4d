import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const hashedPassword = await hash('test123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      hashedPassword,
    },
  });

  // Create test posts
  await prisma.post.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Introducción a la IA en Ventas',
        slug: 'introduccion-ia-ventas',
        excerpt: 'Descubre cómo la IA está transformando el mundo de las ventas...',
        content: '# Introducción a la IA en Ventas\n\nLa inteligencia artificial...',
        image: 'https://images.unsplash.com/photo-1488229297570-58520851e868',
        category: 'Inteligencia Artificial',
        tags: ['IA', 'Ventas', 'Tecnología'],
        readTime: '5 min lectura',
        published: true,
        authorId: user.id,
      },
      {
        title: 'Automatización de Procesos Comerciales',
        slug: 'automatizacion-procesos-comerciales',
        excerpt: 'Aprende a optimizar tus procesos de venta con automatización...',
        content: '# Automatización de Procesos Comerciales\n\nLa automatización...',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        category: 'Automatización',
        tags: ['Automatización', 'Procesos', 'Eficiencia'],
        readTime: '4 min lectura',
        published: true,
        authorId: user.id,
      },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });