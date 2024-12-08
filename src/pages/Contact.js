import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'react-hot-toast';
import { contactSchema } from '../lib/api/contact';
import { contactApi } from '../lib/api/contact';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/SEO';
import CalendlyButton from '../components/CalendlyButton';
const ContactInfo = ({ icon: Icon, title, content }) => (_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-dark rounded-lg flex-shrink-0", children: _jsx(Icon, { className: "h-6 w-6 text-primary" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg mb-1 text-white", children: title }), _jsx("p", { className: "text-gray-400", children: content })] })] }));
const Contact = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(contactSchema)
    });
    const onSubmit = async (data) => {
        try {
            await contactApi.sendMessage(data);
            // Track successful form submission
            trackEvent('Contact', 'Form Submit', 'Success');
            toast.success('Mensaje enviado correctamente');
            reset();
        }
        catch (error) {
            console.error('Error sending message:', error);
            trackEvent('Contact', 'Form Submit', 'Error');
            toast.error('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "Contacto - Pedro Palomares Digital Coach", description: "\u00BFListo para transformar tu negocio? Cont\u00E1ctame para una consulta gratuita." }), _jsx(Toaster, { position: "top-right" }), _jsx("section", { className: "section-padding bg-dark", children: _jsxs("div", { className: "max-w-7xl mx-auto container-padding", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-white", children: "Contacto" }), _jsx("p", { className: "text-xl text-gray-400 max-w-3xl mx-auto", children: "\u00BFListo para transformar tu negocio? Agenda una consulta gratuita" }), _jsx("div", { className: "mt-8", children: _jsx(CalendlyButton, {}) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [_jsx("div", { className: "space-y-8", children: _jsxs("div", { className: "bg-dark-lighter p-8 rounded-xl shadow-lg border border-gray-800", children: [_jsx("h3", { className: "text-2xl font-bold mb-6 text-white", children: "Informaci\u00F3n de Contacto" }), _jsxs("div", { className: "space-y-6", children: [_jsx(ContactInfo, { icon: Mail, title: "Email", content: "pedro.digitalcoach@gmail.com" }), _jsx(ContactInfo, { icon: Phone, title: "Tel\u00E9fono", content: "+34 619 410 431" }), _jsx(ContactInfo, { icon: MapPin, title: "Ubicaci\u00F3n", content: "Barcelona, Espa\u00F1a" })] })] }) }), _jsxs("div", { className: "bg-dark-lighter p-8 rounded-xl shadow-lg border border-gray-800", children: [_jsx("h3", { className: "text-2xl font-bold mb-6 text-white", children: "Env\u00EDame un Mensaje" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-300 mb-1", children: "Nombre" }), _jsx("input", { type: "text", id: "name", ...register('name'), className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "Tu nombre" }), errors.name && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsx("input", { type: "email", id: "email", ...register('email'), className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "tu@email.com" }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-300 mb-1", children: "Mensaje" }), _jsx("textarea", { id: "message", rows: 4, ...register('message'), className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "\u00BFEn qu\u00E9 puedo ayudarte?" }), errors.message && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.message.message }))] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Enviando..."] })) : (_jsxs(_Fragment, { children: ["Enviar Mensaje", _jsx(Send, { className: "h-4 w-4 ml-2" })] })) })] })] })] })] }) })] }));
};
export default Contact;
