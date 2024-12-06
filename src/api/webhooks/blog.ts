import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { blogApi } from '../../lib/api/blog';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  image: z.string().url(),
  category: z.string(),
  tags: z.array(z.string()),
  readTime: z.string(),
  authorId: z.string()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret
  const webhookSecret = req.headers['x-webhook-secret'];
  if (webhookSecret !== process.env.BLOG_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const data = postSchema.parse(req.body);
    const post = await blogApi.createPost(data);
    return res.status(200).json(post);
  } catch (error) {
    console.error('Blog webhook error:', error);
    return res.status(400).json({ error: 'Invalid request data' });
  }
}