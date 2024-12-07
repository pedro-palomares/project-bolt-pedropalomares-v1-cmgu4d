import React from 'react';
import { FileText, Edit, Trash2, Eye } from 'lucide-react';
import type { Post } from '../../../types/blog';

interface PostListProps {
  posts?: Post[];
  isLoading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-dark-lighter p-8 rounded-lg border border-gray-800 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No hay artículos</h3>
        <p className="text-gray-400">
          Comienza creando tu primer artículo o genera uno con IA.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-dark-lighter p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-dark transition-colors"
                title="Ver artículo"
              >
                <Eye className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-dark transition-colors"
                title="Editar artículo"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-dark transition-colors"
                title="Eliminar artículo"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-400 mb-4">{post.excerpt}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-400">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>{post.readTime}</span>
            </div>
            <span className="px-3 py-1 bg-dark text-primary rounded-full text-sm border border-primary/20">
              {post.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;