import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { trackEvent } from '../lib/analytics';
import { logError, logInfo } from '../lib/utils/logger';
import { leadSchema, leadsApi } from '../lib/api/leads';
const LeadPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(leadSchema)
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            const popupData = localStorage.getItem('popupData');
            const popupState = popupData ? JSON.parse(popupData) : null;
            const currentTime = new Date().getTime();
            if (!popupState || currentTime > popupState.expires) {
                setIsVisible(true);
                trackEvent('Popup', 'Show', 'Lead Generation');
                logInfo('Lead popup shown to user');
            }
        }, 15000);
        return () => clearTimeout(timer);
    }, []);
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            logInfo('Processing lead form submission', { email: data.email });
            const response = await leadsApi.submitLead(data);
            // Guardar estado del popup con fecha de expiración (7 días)
            localStorage.setItem('popupData', JSON.stringify({
                hasSeenPopup: true,
                expires: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
            }));
            setIsVisible(false);
            reset();
            toast.success(response.message, {
                duration: 5000,
                position: 'top-center'
            });
            trackEvent('Popup', 'Submit', 'Lead Generation Success');
            logInfo('Lead form submitted successfully', { email: data.email });
        }
        catch (error) {
            let errorMessage = 'Error al enviar el formulario. Por favor, inténtalo de nuevo.';
            if (error instanceof Error) {
                if (error.message.includes('Network')) {
                    errorMessage = 'Error de conexión. Verifica tu red e inténtalo nuevamente.';
                }
                logError(error, {
                    context: 'Lead Form Submission',
                    formData: { email: data.email }
                });
            }
            toast.error(errorMessage, {
                duration: 5000,
                position: 'top-center'
            });
            trackEvent('Popup', 'Error', 'Lead Generation Failed');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('popupData', JSON.stringify({
            hasSeenPopup: true,
            expires: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        }));
        trackEvent('Popup', 'Close', 'Lead Generation');
        logInfo('Lead popup closed by user');
    };
    if (!isVisible)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", role: "dialog", "aria-modal": "true", "aria-labelledby": "lead-popup-title", children: _jsxs("div", { className: "bg-dark-lighter rounded-lg p-6 w-full max-w-md relative animate-fade-in", children: [_jsx("button", { onClick: handleClose, className: "absolute top-4 right-4 text-gray-400 hover:text-white transition-colors", "aria-label": "Cerrar", children: _jsx(X, { className: "h-6 w-6" }) }), _jsx("h2", { id: "lead-popup-title", className: "text-2xl font-bold text-white mb-4", children: "Descubre c\u00F3mo la IA puede transformar tu negocio" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Descarga nuestra gu\u00EDa gratuita y aprende c\u00F3mo implementar soluciones de IA en tu empresa." }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-300 mb-1", children: "Nombre" }), _jsx("input", { ...register('name'), id: "name", type: "text", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "Tu nombre" }), errors.name && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsx("input", { ...register('email'), id: "email", type: "email", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "tu@email.com" }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-300 mb-1", children: "Tel\u00E9fono" }), _jsx("input", { ...register('phone'), id: "phone", type: "tel", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "+34 600 000 000" }), errors.phone && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.phone.message }))] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), "Enviando..."] })) : ('Descargar Guía Gratuita') })] })] }) }));
};
export default LeadPopup;
