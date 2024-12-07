import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Plus, Wand2 } from 'lucide-react';
import { blogApi } from '../../../lib/api/blog';
import GeneratePost from './GeneratePost';
import PostList from './PostList';

const BlogAdmin = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: blogApi.getPosts
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog</h1>
          <p className="text-gray-400 mt-1">
            Gestiona y genera contenido para el blog
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-dark-lighter text-white rounded-md hover:bg-dark-light transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Artículo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PostList posts={posts} isLoading={isLoading} />
        </div>
        
        <div>
          <GeneratePost />
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;