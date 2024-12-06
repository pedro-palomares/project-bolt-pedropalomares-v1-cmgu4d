import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth handlers
  http.post('*/oauth/token', () => {
    return HttpResponse.json({
      access_token: 'mock-token',
      expires_in: 86400,
      token_type: 'Bearer'
    });
  }),

  // Blog API handlers
  http.get('*/api/posts', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        content: 'Test content',
        image: 'https://example.com/image.jpg',
        category: 'Test',
        tags: ['test'],
        readTime: '5 min',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: '1'
      }
    ]);
  }),

  // Contact form handler
  http.post('*/api/contact', () => {
    return HttpResponse.json({ message: 'Message sent successfully' });
  })
];