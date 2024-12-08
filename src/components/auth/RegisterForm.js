import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext';
import { registerSchema } from '../../lib/auth/validation';
import { logError } from '../../lib/utils/logger';
const RegisterForm = ({ onSuccess }) => {
    const { register: authRegister } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    });
    const onSubmit = async (data) => {
        try {
            await authRegister(data.email, data.password, data.name);
            onSuccess?.();
        }
        catch (error) {
            logError(error, { context: 'Register Form' });
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-300 mb-1", children: "Nombre completo" }), _jsx("input", { ...register('name'), type: "text", id: "name", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "Tu nombre completo" }), errors.name && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsx("input", { ...register('email'), type: "email", id: "email", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "tu@email.com" }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-300 mb-1", children: "Contrase\u00F1a" }), _jsx("input", { ...register('password'), type: "password", id: "password", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "********" }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.password.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-300 mb-1", children: "Confirmar contrase\u00F1a" }), _jsx("input", { ...register('confirmPassword'), type: "password", id: "confirmPassword", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "********" }), errors.confirmPassword && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.confirmPassword.message }))] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { ...register('terms'), type: "checkbox", id: "terms", className: "h-4 w-4 rounded border-gray-700 bg-dark text-primary focus:ring-primary" }) }), _jsx("label", { htmlFor: "terms", className: "ml-2 block text-sm text-gray-400", children: "Acepto los t\u00E9rminos y condiciones" })] }), errors.terms && (_jsx("p", { className: "text-sm text-red-500", children: errors.terms.message })), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), "Creando cuenta..."] })) : ('Crear cuenta') })] }));
};
export default RegisterForm;
