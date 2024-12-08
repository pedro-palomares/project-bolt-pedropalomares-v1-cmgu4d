import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode);
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in", children: [_jsx(Toaster, { position: "top-right" }), _jsxs("div", { className: "bg-dark-lighter rounded-lg p-6 w-full max-w-md relative", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-gray-400 hover:text-white transition-colors", "aria-label": "Cerrar", children: _jsx(X, { className: "h-6 w-6" }) }), _jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta' }), mode === 'login' ? (_jsx(LoginForm, { onSuccess: onClose })) : (_jsx(RegisterForm, { onSuccess: onClose })), _jsx("div", { className: "mt-6 text-center", children: _jsx("button", { onClick: () => setMode(mode === 'login' ? 'register' : 'login'), className: "text-gray-400 hover:text-primary transition-colors", children: mode === 'login'
                                ? '¿No tienes cuenta? Regístrate'
                                : '¿Ya tienes cuenta? Inicia sesión' }) }), _jsxs("p", { className: "mt-4 text-center text-gray-400 text-sm", children: ["Al ", mode === 'login' ? 'iniciar sesión' : 'registrarte', ", aceptas nuestros", ' ', _jsx("a", { href: "/terms", className: "text-primary hover:text-primary-light", children: "t\u00E9rminos y condiciones" }), ' ', "y", ' ', _jsx("a", { href: "/privacy", className: "text-primary hover:text-primary-light", children: "pol\u00EDtica de privacidad" }), "."] })] })] }));
};
export default AuthModal;
