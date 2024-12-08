import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { blogApi } from '../../../lib/api/blog';
import GeneratePost from './GeneratePost';
import PostList from './PostList';
const BlogAdmin = () => {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['admin-posts'],
        queryFn: blogApi.getPosts
    });
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Blog" }), _jsx("p", { className: "text-gray-400 mt-1", children: "Gestiona y genera contenido para el blog" })] }), _jsx("div", { className: "flex items-center space-x-4", children: _jsxs("button", { className: "flex items-center px-4 py-2 bg-dark-lighter text-white rounded-md hover:bg-dark-light transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Nuevo Art\u00EDculo"] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(PostList, { posts: posts, isLoading: isLoading }) }), _jsx("div", { children: _jsx(GeneratePost, {}) })] })] }));
};
export default BlogAdmin;
