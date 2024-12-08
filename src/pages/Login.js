import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { loginWithEmail, loginWithGoogle } from '../lib/firebase/auth';
import SEO from '../components/SEO';
const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});
const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = async (data) => {
        try {
            await loginWithEmail(data.email, data.password);
            toast.success('Inicio de sesión exitoso');
            navigate('/dashboard');
        }
        catch (error) {
            toast.error('Credenciales inválidas');
        }
    };
    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            toast.success('Inicio de sesión exitoso');
            navigate('/dashboard');
        }
        catch (error) {
            toast.error('Error al iniciar sesión con Google');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "Iniciar Sesi\u00F3n - Pedro Palomares Digital Coach", description: "Accede a tu cuenta para gestionar tus consultas y recursos personalizados." }), _jsx("div", { className: "min-h-screen bg-dark flex items-center justify-center px-4", children: _jsx("div", { className: "max-w-md w-full", children: _jsxs("div", { className: "bg-dark-lighter p-8 rounded-lg shadow-lg border border-gray-800", children: [_jsx("h1", { className: "text-2xl font-bold text-white mb-6 text-center", children: "Iniciar Sesi\u00F3n" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx("input", { ...register('email'), type: "email", id: "email", className: "w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "tu@email.com" })] }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-300 mb-1", children: "Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx("input", { ...register('password'), type: "password", id: "password", className: "w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "********" })] }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.password.message }))] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), "Iniciando sesi\u00F3n..."] })) : ('Iniciar Sesión') })] }), _jsxs("div", { className: "relative my-6", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-700" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-dark-lighter text-gray-400", children: "O contin\u00FAa con" }) })] }), _jsxs("button", { onClick: handleGoogleLogin, className: "w-full flex items-center justify-center px-4 py-2 bg-dark text-white border border-gray-700 rounded-md hover:bg-dark-light transition-colors", children: [_jsx("img", { src: "https://www.google.com/favicon.ico", alt: "Google", className: "w-5 h-5 mr-2" }), "Google"] }), _jsxs("p", { className: "mt-6 text-center text-gray-400", children: ["\u00BFNo tienes una cuenta?", ' ', _jsx(Link, { to: "/signup", className: "text-primary hover:text-primary-light", children: "Reg\u00EDstrate aqu\u00ED" })] })] }) }) })] }));
};
export default Login;
