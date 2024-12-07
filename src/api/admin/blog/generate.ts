import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { generatePostSchema } from '../../../lib/api/blog';
import { blogApi } from '../../../lib/api/blog';
import { unsplashApi } from '../../../lib/api/unsplash';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = generatePostSchema.parse(req.body);
    
    // Generate content with OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional blog writer specializing in digital transformation, AI, and business automation."
        },
        {
          role: "user",
          content: `Write a detailed blog post about: ${data.topic}. Include a title, excerpt, and main content in markdown format.`
        }
      ]
    });

    const generatedContent = completion.data.choices[0].message?.content;
    if (!generatedContent) {
      throw new Error('Failed to generate content');
    }

    // Parse the generated content
    const [title, ...contentParts] = generatedContent.split('\n\n');
    const excerpt = contentParts[0];
    const content = contentParts.join('\n\n');

    // Get a relevant image from Unsplash
    const image = await unsplashApi.searchPhoto(data.topic);

    // Create the post
    const post = await blogApi.createPost({
      title: title.replace('# ', ''),
      excerpt,
      content,
      image,
      category: data.category,
      tags: data.tags.split(',').map(tag => tag.trim()),
      readTime: `${Math.ceil(content.length / 1500)} min lectura`,
      published: false,
      authorId: req.user.id // From your auth middleware
    });

    // Notify Make/n8n webhook about the new post
    await fetch(process.env.AUTOMATION_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error('Error generating post:', error);
    return res.status(500).json({ error: 'Error generating post' });
  }
}