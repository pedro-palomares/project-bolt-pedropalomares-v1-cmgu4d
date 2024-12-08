import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../lib/auth/AuthContext';
const Profile = () => {
    const { user, logout } = useAuth();
    if (!user) {
        return null;
    }
    return (_jsx("div", { className: "min-h-screen bg-dark py-12 px-4", children: _jsx("div", { className: "max-w-3xl mx-auto", children: _jsxs("div", { className: "bg-dark-lighter rounded-lg shadow-lg overflow-hidden", children: [_jsxs("div", { className: "bg-gradient-to-r from-primary/20 to-dark p-6 flex items-center space-x-6", children: [_jsx("div", { className: "relative", children: _jsx("div", { className: "w-24 h-24 rounded-full bg-dark-lighter flex items-center justify-center", children: _jsx(User, { className: "h-12 w-12 text-primary" }) }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: user.name }), _jsx("p", { className: "text-gray-400", children: user.email })] })] }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Mail, { className: "h-5 w-5 text-primary mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Email" }), _jsx("p", { className: "text-white", children: user.email })] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Calendar, { className: "h-5 w-5 text-primary mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Fecha de registro" }), _jsx("p", { className: "text-white", children: new Date().toLocaleDateString() })] })] })] }) }), _jsx("div", { className: "pt-6 border-t border-gray-800", children: _jsx("button", { onClick: logout, className: "px-4 py-2 bg-red-600/10 text-red-500 rounded-md hover:bg-red-600/20 transition-colors", children: "Cerrar Sesi\u00F3n" }) })] })] }) }) }));
};
export default Profile;
