import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Wand2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generatePostSchema } from '../../../lib/api/blog';
import { blogApi } from '../../../lib/api/blog';
const GeneratePost = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(generatePostSchema)
    });
    const { mutate: generatePost, isLoading } = useMutation({
        mutationFn: blogApi.generatePost,
        onSuccess: () => {
            toast.success('Artículo generado correctamente');
            reset();
        },
        onError: () => {
            toast.error('Error al generar el artículo');
        }
    });
    return (_jsxs("div", { className: "bg-dark-lighter rounded-lg p-6 border border-gray-800", children: [_jsxs("h2", { className: "text-xl font-semibold mb-4 flex items-center", children: [_jsx(Wand2, { className: "w-5 h-5 mr-2 text-primary" }), "Generar Art\u00EDculo con IA"] }), _jsxs("form", { onSubmit: handleSubmit((data) => generatePost(data)), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-1", children: "Tema del Art\u00EDculo" }), _jsx("input", { ...register('topic'), className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "Ej: C\u00F3mo la IA est\u00E1 transformando las ventas en 2024" }), errors.topic && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.topic.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-1", children: "Categor\u00EDa" }), _jsxs("select", { ...register('category'), className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", children: [_jsx("option", { value: "", children: "Selecciona una categor\u00EDa" }), _jsx("option", { value: "Inteligencia Artificial", children: "Inteligencia Artificial" }), _jsx("option", { value: "Automatizaci\u00F3n", children: "Automatizaci\u00F3n" }), _jsx("option", { value: "Ventas", children: "Ventas" }), _jsx("option", { value: "Marketing Digital", children: "Marketing Digital" })] }), errors.category && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.category.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-1", children: "Tags (separados por coma)" }), _jsx("input", { ...register('tags'), className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "IA, Ventas, Tecnolog\u00EDa" }), errors.tags && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.tags.message }))] }), _jsx("button", { type: "submit", disabled: isLoading, className: "flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), "Generando..."] })) : (_jsxs(_Fragment, { children: [_jsx(Wand2, { className: "w-4 h-4 mr-2" }), "Generar Art\u00EDculo"] })) })] })] }));
};
export default GeneratePost;
