import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Settings, User, LogOut } from 'lucide-react';
import Logo from '../Logo';
const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth0();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-dark flex", children: [_jsx("div", { className: "fixed inset-y-0 left-0 w-64 bg-dark-lighter border-r border-gray-800", children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "p-4", children: [_jsx(Link, { to: "/", className: "block mb-6", children: _jsx(Logo, {}) }), _jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center", children: user?.picture ? (_jsx("img", { src: user.picture, alt: user?.name, className: "w-10 h-10 rounded-full" })) : (_jsx(User, { className: "w-6 h-6 text-white" })) }), _jsxs("div", { children: [_jsx("h2", { className: "text-white font-medium", children: user?.name }), _jsx("p", { className: "text-sm text-gray-400", children: user?.email })] })] })] }), _jsx("nav", { className: "flex-1 p-4", children: _jsxs("ul", { className: "space-y-2", children: [_jsx("li", { children: _jsxs(Link, { to: "/dashboard", className: "flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors", children: [_jsx(Home, { className: "w-5 h-5" }), _jsx("span", { children: "Dashboard" })] }) }), _jsx("li", { children: _jsxs(Link, { to: "/dashboard/profile", className: "flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors", children: [_jsx(User, { className: "w-5 h-5" }), _jsx("span", { children: "Perfil" })] }) }), _jsx("li", { children: _jsxs(Link, { to: "/dashboard/settings", className: "flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors", children: [_jsx(Settings, { className: "w-5 h-5" }), _jsx("span", { children: "Configuraci\u00F3n" })] }) })] }) }), _jsx("div", { className: "p-4 border-t border-gray-800", children: _jsxs("button", { onClick: handleLogout, className: "flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors w-full", children: [_jsx(LogOut, { className: "w-5 h-5" }), _jsx("span", { children: "Cerrar Sesi\u00F3n" })] }) })] }) }), _jsx("div", { className: "ml-64 w-full", children: _jsx("div", { className: "p-8", children: children }) })] }));
};
export default DashboardLayout;
