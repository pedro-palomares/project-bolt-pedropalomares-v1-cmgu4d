import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogApi } from '../lib/api/blog';
import SEO from '../components/SEO';
import type { Post } from '../lib/api/blog';

const BlogCard = ({ post }: { post: Post }) => (
  <div className="bg-dark-lighter rounded-xl shadow-lg overflow-hidden group border border-gray-800">
    <div className="relative overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
        <span className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {post.readTime}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-400 mb-4">{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center text-primary hover:text-red-400 transition-colors"
      >
        Leer más <ArrowRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  </div>
);

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: blogApi.getPosts
  });

  return (
    <>
      <SEO 
        title="Blog - Pedro Palomares Digital Coach"
        description="Artículos y recursos sobre ventas, tecnología y transformación digital"
      />
      
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Blog</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Artículos y recursos sobre ventas, tecnología y transformación digital
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="text-center text-gray-400">
              No hay artículos publicados todavía.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;