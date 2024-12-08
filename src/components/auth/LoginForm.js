import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext';
import { loginSchema } from '../../lib/auth/validation';
import { logError } from '../../lib/utils/logger';
const LoginForm = ({ onSuccess }) => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            onSuccess?.();
        }
        catch (error) {
            logError(error, { context: 'Login Form' });
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsx("input", { ...register('email'), type: "email", id: "email", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "tu@email.com" }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-300 mb-1", children: "Contrase\u00F1a" }), _jsx("input", { ...register('password'), type: "password", id: "password", className: "w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "********" }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.password.message }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { ...register('rememberMe'), type: "checkbox", id: "remember-me", className: "h-4 w-4 rounded border-gray-700 bg-dark text-primary focus:ring-primary" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-400", children: "Recordarme" })] }), _jsx("a", { href: "/forgot-password", className: "text-sm text-primary hover:text-primary-light", children: "\u00BFOlvidaste tu contrase\u00F1a?" })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), "Iniciando sesi\u00F3n..."] })) : ('Iniciar Sesión') }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-700" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-dark-lighter text-gray-400", children: "O contin\u00FAa con" }) })] }), _jsxs("button", { type: "button", className: "w-full flex items-center justify-center px-6 py-3 bg-dark text-white border border-gray-700 rounded-md hover:bg-dark-light transition-colors", children: [_jsx(Mail, { className: "h-5 w-5 mr-2" }), "Google"] })] }));
};
export default LoginForm;
