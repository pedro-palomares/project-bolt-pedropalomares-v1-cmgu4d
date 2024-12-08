import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { marked } from 'marked';
import { Calendar, Clock, Tag } from 'lucide-react';
import { blogApi } from '../lib/api/blog';
import SEO from '../components/SEO';
const BlogPost = () => {
    const { slug } = useParams();
    const { data: post, isLoading } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => blogApi.getPostBySlug(slug),
        enabled: !!slug
    });
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" }) }));
    }
    if (!post) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("h1", { className: "text-2xl text-gray-400", children: "Art\u00EDculo no encontrado" }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: post.title, description: post.excerpt, image: post.image }), _jsxs("article", { className: "max-w-4xl mx-auto px-4 py-16", children: [_jsx("div", { className: "mb-8", children: _jsx("img", { src: post.image, alt: post.title, className: "w-full h-[400px] object-cover rounded-xl" }) }), _jsxs("div", { className: "mb-8", children: [_jsx("span", { className: "inline-block px-3 py-1 bg-primary text-white rounded-full text-sm", children: post.category }), _jsx("h1", { className: "text-4xl font-bold mt-4 mb-6", children: post.title }), _jsxs("div", { className: "flex items-center space-x-6 text-gray-400", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-4 w-4 mr-2" }), new Date(post.date).toLocaleDateString()] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 mr-2" }), post.readTime] })] })] }), _jsx("div", { className: "prose prose-invert prose-lg max-w-none", dangerouslySetInnerHTML: { __html: marked(post.content) } }), _jsx("div", { className: "mt-8 pt-8 border-t border-gray-800", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Tag, { className: "h-5 w-5 text-primary" }), _jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map((tag) => (_jsx("span", { className: "px-3 py-1 bg-dark-lighter text-gray-300 rounded-full text-sm", children: tag }, tag))) })] }) })] })] }));
};
export default BlogPost;
