import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => (
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
          {post.date}
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
      <a
        href="#"
        className="inline-flex items-center text-primary hover:text-red-400 transition-colors"
      >
        Leer más <ArrowRight className="h-4 w-4 ml-1" />
      </a>
    </div>
  </div>
);

const Blog = () => {
  const posts: BlogPost[] = [
    {
      title: "Cómo la IA está Transformando las Ventas en 2024",
      excerpt: "Descubre las últimas tendencias en IA y cómo están revolucionando el mundo de las ventas...",
      date: "15 Mar 2024",
      readTime: "5 min lectura",
      image: "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&q=80&w=800",
      category: "Inteligencia Artificial"
    },
    {
      title: "Estrategias de Automatización para Empresas",
      excerpt: "Guía práctica para implementar automatización en procesos de venta y atención al cliente...",
      date: "12 Mar 2024",
      readTime: "4 min lectura",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      category: "Automatización"
    },
    {
      title: "Optimización de Procesos Comerciales",
      excerpt: "Aprende a identificar y eliminar cuellos de botella en tus procesos de venta...",
      date: "10 Mar 2024",
      readTime: "6 min lectura",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      category: "Ventas"
    }
  ];

  return (
    <section id="blog" className="section-padding bg-dark-lighter">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Blog</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Artículos y recursos sobre ventas, tecnología y transformación digital
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
          >
            Ver todos los artículos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;