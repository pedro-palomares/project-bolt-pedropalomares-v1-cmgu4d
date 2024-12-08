import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { registerWithEmail } from '../lib/firebase/auth';
import SEO from '../components/SEO';
const signupSchema = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
    email: z.string().email('Email inválido'),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});
const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema)
    });
    const onSubmit = async (data) => {
        try {
            await registerWithEmail(data.email, data.password, data.name);
            toast.success('Registro exitoso');
            navigate('/dashboard');
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('email-already-in-use')) {
                toast.error('Este email ya está registrado');
            }
            else {
                toast.error('Error al registrar usuario');
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "Registro - Pedro Palomares Digital Coach", description: "Crea tu cuenta para acceder a recursos exclusivos y consultas personalizadas." }), _jsx("div", { className: "min-h-screen bg-dark flex items-center justify-center px-4", children: _jsx("div", { className: "max-w-md w-full", children: _jsxs("div", { className: "bg-dark-lighter p-8 rounded-lg shadow-lg border border-gray-800", children: [_jsx("h1", { className: "text-2xl font-bold text-white mb-6 text-center", children: "Crear Cuenta" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-300 mb-1", children: "Nombre" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx("input", { ...register('name'), type: "text", id: "name", className: "w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "Tu nombre completo" })] }), errors.name && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-1", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx("input", { ...register('email'), type: "email", id: "email", className: "w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "tu@email.com" })] }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-300 mb-1", children: "Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx("input", { ...register('password'), type: "password", id: "password", className: "w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "********" })] }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.password.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-300 mb-1", children: "Confirmar Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx("input", { ...register('confirmPassword'), type: "password", id: "confirmPassword", className: "w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white", placeholder: "********" })] }), errors.confirmPassword && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.confirmPassword.message }))] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), "Creando cuenta..."] })) : ('Crear Cuenta') })] }), _jsxs("p", { className: "mt-6 text-center text-gray-400", children: ["\u00BFYa tienes una cuenta?", ' ', _jsx(Link, { to: "/login", className: "text-primary hover:text-primary-light", children: "Inicia sesi\u00F3n aqu\u00ED" })] })] }) }) })] }));
};
export default Signup;
