import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext';
import { LayoutDashboard, FileText, Users, Settings, LogOut, Image } from 'lucide-react';
const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const menuItems = [
        {
            icon: LayoutDashboard,
            name: 'Dashboard',
            path: '/admin'
        },
        {
            icon: FileText,
            name: 'Blog',
            path: '/admin/blog'
        },
        {
            icon: Image,
            name: 'Media',
            path: '/admin/media'
        },
        {
            icon: Users,
            name: 'Usuarios',
            path: '/admin/users'
        },
        {
            icon: Settings,
            name: 'Configuración',
            path: '/admin/settings'
        }
    ];
    return (_jsx("nav", { className: "space-y-2", children: menuItems.map((item) => (_jsxs(Link, { to: item.path, className: `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-dark hover:text-white'}`, children: [_jsx(item.icon, { className: "w-5 h-5" }), _jsx("span", { children: item.name })] }, item.path))) }));
};
const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (_jsxs("div", { className: "min-h-screen bg-dark flex", children: [_jsx("div", { className: "fixed inset-y-0 left-0 w-64 bg-dark-lighter border-r border-gray-800", children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "p-4", children: [_jsx(Link, { to: "/", className: "text-xl font-bold text-white mb-8 block", children: "Admin Panel" }), _jsxs("div", { className: "flex items-center space-x-3 mb-8", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center", children: _jsx("span", { className: "text-white font-semibold", children: user?.name?.charAt(0) }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-white font-medium", children: user?.name }), _jsx("p", { className: "text-sm text-gray-400", children: user?.email })] })] })] }), _jsx("div", { className: "flex-1 px-4", children: _jsx(Sidebar, {}) }), _jsx("div", { className: "p-4 border-t border-gray-800", children: _jsxs("button", { onClick: handleLogout, className: "flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors w-full", children: [_jsx(LogOut, { className: "w-5 h-5" }), _jsx("span", { children: "Cerrar Sesi\u00F3n" })] }) })] }) }), _jsx("div", { className: "ml-64 w-full", children: _jsx("div", { className: "p-8", children: children }) })] }));
};
export default AdminLayout;
