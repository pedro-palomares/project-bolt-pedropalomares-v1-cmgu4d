import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import { marked } from 'marked';
import CalendlyButton from '../CalendlyButton';
import { trackEvent } from '../../lib/analytics';

interface BlogArticleProps {
  title: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
  image: string;
}

const BlogArticle: React.FC<BlogArticleProps> = ({
  title,
  date,
  readTime,
  content,
  tags,
  image
}) => {
  const handleCtaClick = () => {
    trackEvent('CTA', 'Click', 'Blog Article');
  };

  return (
    <article className="max-w-4xl mx-auto px-4">
      <img
        src={image}
        alt={title}
        className="w-full h-[400px] object-cover rounded-xl mb-8"
      />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        
        <div className="flex items-center space-x-4 text-gray-400 mb-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {date}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {readTime}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-dark text-primary border border-primary/20"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div 
        className="prose prose-invert prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      />

      <div className="bg-dark-lighter rounded-lg p-8 text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">
          ¿Quieres implementar estas soluciones en tu negocio?
        </h3>
        <p className="text-gray-400 mb-6">
          Agenda una consulta gratuita y descubre cómo puedo ayudarte a transformar tu empresa.
        </p>
        <div className="flex justify-center space-x-4">
          <CalendlyButton />
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
          >
            Descargar Guía Gratuita
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogArticle;