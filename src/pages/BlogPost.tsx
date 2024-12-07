import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { marked } from 'marked';
import { Calendar, Clock, Tag } from 'lucide-react';
import { blogApi } from '../lib/api/blog';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => blogApi.getPostBySlug(slug!),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-400">Artículo no encontrado</h1>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        image={post.image}
      />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm">
            {post.category}
          </span>
          
          <h1 className="text-4xl font-bold mt-4 mb-6">{post.title}</h1>
          
          <div className="flex items-center space-x-6 text-gray-400">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readTime}
            </span>
          </div>
        </div>

        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        />

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-primary" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-dark-lighter text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;