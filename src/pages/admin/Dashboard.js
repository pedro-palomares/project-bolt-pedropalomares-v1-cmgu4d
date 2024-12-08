import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '../../lib/auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Users, FileText, Settings } from 'lucide-react';
import { blogApi } from '../../lib/api/blog';
const StatCard = ({ title, value, icon: Icon, change }) => (_jsx("div", { className: "bg-dark-lighter p-6 rounded-xl border border-gray-800", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: title }), _jsx("h3", { className: "text-2xl font-semibold text-white mt-1", children: value }), change && (_jsxs("p", { className: "text-sm mt-1", children: [_jsx("span", { className: change.startsWith('+') ? 'text-green-500' : 'text-red-500', children: change }), ' vs último mes'] }))] }), _jsx("div", { className: "bg-dark p-3 rounded-lg", children: _jsx(Icon, { className: "w-6 h-6 text-primary" }) })] }) }));
const AdminDashboard = () => {
    const { user } = useAuth();
    const { data: posts } = useQuery({
        queryKey: ['admin-posts'],
        queryFn: blogApi.getPosts
    });
    const stats = [
        {
            title: 'Total Usuarios',
            value: '1,234',
            icon: Users,
            change: '+12.3%'
        },
        {
            title: 'Artículos Publicados',
            value: posts?.length.toString() || '0',
            icon: FileText,
            change: '+4.5%'
        },
        {
            title: 'Visitas Totales',
            value: '45.2K',
            icon: BarChart,
            change: '+15.3%'
        },
        {
            title: 'Tasa de Conversión',
            value: '3.2%',
            icon: Settings,
            change: '+2.1%'
        }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Panel de Administraci\u00F3n" }), _jsxs("p", { className: "text-gray-400 mt-1", children: ["Bienvenido de nuevo, ", user?.name] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, index) => (_jsx(StatCard, { ...stat }, index))) })] }));
};
export default AdminDashboard;
