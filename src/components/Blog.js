import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Clock, ArrowRight } from 'lucide-react';
const BlogCard = ({ post }) => (_jsxs("div", { className: "bg-dark-lighter rounded-xl shadow-lg overflow-hidden group border border-gray-800", children: [_jsxs("div", { className: "relative overflow-hidden", children: [_jsx("img", { src: post.image, alt: post.title, className: "w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" }), _jsx("div", { className: "absolute top-4 left-4", children: _jsx("span", { className: "px-3 py-1 bg-primary text-white rounded-full text-sm", children: post.category }) })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-400 mb-3 space-x-4", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-4 w-4 mr-1" }), post.date] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), post.readTime] })] }), _jsx("h3", { className: "text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors", children: post.title }), _jsx("p", { className: "text-gray-400 mb-4", children: post.excerpt }), _jsxs("a", { href: "#", className: "inline-flex items-center text-primary hover:text-red-400 transition-colors", children: ["Leer m\u00E1s ", _jsx(ArrowRight, { className: "h-4 w-4 ml-1" })] })] })] }));
const Blog = () => {
    const posts = [
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
    return (_jsx("section", { id: "blog", className: "section-padding bg-dark-lighter", children: _jsxs("div", { className: "max-w-7xl mx-auto container-padding", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-white", children: "Blog" }), _jsx("p", { className: "text-xl text-gray-400 max-w-3xl mx-auto", children: "Art\u00EDculos y recursos sobre ventas, tecnolog\u00EDa y transformaci\u00F3n digital" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post, index) => (_jsx(BlogCard, { post: post }, index))) }), _jsx("div", { className: "text-center mt-12", children: _jsx("a", { href: "#", className: "inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors", children: "Ver todos los art\u00EDculos" }) })] }) }));
};
export default Blog;
