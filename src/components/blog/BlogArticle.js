import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Clock, Tag } from 'lucide-react';
import { marked } from 'marked';
import CalendlyButton from '../CalendlyButton';
import { trackEvent } from '../../lib/analytics';
const BlogArticle = ({ title, date, readTime, content, tags, image }) => {
    const handleCtaClick = () => {
        trackEvent('CTA', 'Click', 'Blog Article');
    };
    return (_jsxs("article", { className: "max-w-4xl mx-auto px-4", children: [_jsx("img", { src: image, alt: title, className: "w-full h-[400px] object-cover rounded-xl mb-8" }), _jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-4", children: title }), _jsxs("div", { className: "flex items-center space-x-4 text-gray-400 mb-4", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-4 w-4 mr-2" }), date] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 mr-2" }), readTime] })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => (_jsxs("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-sm bg-dark text-primary border border-primary/20", children: [_jsx(Tag, { className: "h-3 w-3 mr-1" }), tag] }, tag))) })] }), _jsx("div", { className: "prose prose-invert prose-lg max-w-none mb-12", dangerouslySetInnerHTML: { __html: marked(content) } }), _jsxs("div", { className: "bg-dark-lighter rounded-lg p-8 text-center mb-12", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "\u00BFQuieres implementar estas soluciones en tu negocio?" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Agenda una consulta gratuita y descubre c\u00F3mo puedo ayudarte a transformar tu empresa." }), _jsxs("div", { className: "flex justify-center space-x-4", children: [_jsx(CalendlyButton, {}), _jsx("button", { onClick: handleCtaClick, className: "inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors", children: "Descargar Gu\u00EDa Gratuita" })] })] })] }));
};
export default BlogArticle;
