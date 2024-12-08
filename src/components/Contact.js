import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
const ContactInfo = ({ icon: Icon, title, content }) => (_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-dark rounded-lg flex-shrink-0", children: _jsx(Icon, { className: "h-6 w-6 text-primary" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg mb-1 text-white", children: title }), _jsx("p", { className: "text-gray-400", children: content })] })] }));
const Contact = () => {
    return (_jsx("section", { id: "contact", className: "section-padding bg-dark", children: _jsxs("div", { className: "max-w-7xl mx-auto container-padding", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-white", children: "Contacto" }), _jsx("p", { className: "text-xl text-gray-400 max-w-3xl mx-auto", children: "\u00BFListo para transformar tu negocio? Agenda una consulta gratuita" })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [_jsx("div", { className: "space-y-8", children: _jsxs("div", { className: "bg-dark-lighter p-8 rounded-xl shadow-lg border border-gray-800", children: [_jsx("h3", { className: "text-2xl font-bold mb-6 text-white", children: "Informaci\u00F3n de Contacto" }), _jsxs("div", { className: "space-y-6", children: [_jsx(ContactInfo, { icon: Mail, title: "Email", content: "contacto@pedropalomares.com" }), _jsx(ContactInfo, { icon: Phone, title: "Tel\u00E9fono", content: "+34 619 410 431" }), _jsx(ContactInfo, { icon: MapPin, title: "Ubicaci\u00F3n", content: "Barcelona, Espa\u00F1a" })] })] }) }), _jsxs("div", { className: "bg-dark-lighter p-8 rounded-xl shadow-lg border border-gray-800", children: [_jsx("h3", { className: "text-2xl font-bold mb-6 text-white", children: "Env\u00EDame un Mensaje" }), _jsxs("form", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-300 mb-1", children: "Nombre" }), _jsx("input", { type: "text", id: "name", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "Tu nombre" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsx("input", { type: "email", id: "email", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "tu@email.com" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-300 mb-1", children: "Mensaje" }), _jsx("textarea", { id: "message", rows: 4, className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "\u00BFEn qu\u00E9 puedo ayudarte?" })] }), _jsxs("button", { type: "submit", className: "w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-red-700 transition-colors", children: ["Enviar Mensaje", _jsx(Send, { className: "h-4 w-4 ml-2" })] })] })] })] })] }) }));
};
export default Contact;