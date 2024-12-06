import { z } from 'zod';
import { blogPosts } from '../../data/blogPosts';
import type { Post } from '../../types/blog';

export const generatePostSchema = z.object({
  topic: z.string().min(10, 'El tema debe tener al menos 10 caracteres'),
  category: z.string().min(1, 'Selecciona una categoría'),
  tags: z.string().min(1, 'Agrega al menos un tag')
});

export type GeneratePostForm = z.infer<typeof generatePostSchema>;

export const blogApi = {
  getPosts: async (): Promise<Post[]> => {
    return blogPosts;
  },

  getPostBySlug: async (slug: string): Promise<Post | null> => {
    const post = blogPosts.find(p => p.slug === slug);
    return post || null;
  },

  getLatestPosts: async (limit: number = 3): Promise<Post[]> => {
    return blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  },

  generatePost: async (data: GeneratePostForm): Promise<Post> => {
    const validatedData = generatePostSchema.parse(data);
    
    // Here you would typically call your AI service to generate content
    // For now, we'll return a mock response
    const newPost: Post = {
      id: Date.now().toString(),
      title: `Artículo sobre ${validatedData.topic}`,
      slug: validatedData.topic.toLowerCase().replace(/\s+/g, '-'),
      excerpt: `Artículo generado sobre ${validatedData.topic}`,
      content: `# ${validatedData.topic}\n\nContenido generado...`,
      image: 'https://images.unsplash.com/photo-1488229297570-58520851e868',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min lectura',
      tags: validatedData.tags.split(',').map(tag => tag.trim())
    };

    return newPost;
  }
};