import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth0 } from '@auth0/auth0-react';
import { Activity, Users, TrendingUp, BarChart } from 'lucide-react';
const StatCard = ({ title, value, icon: Icon, change }) => (_jsx("div", { className: "bg-dark-lighter p-6 rounded-xl border border-gray-800", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: title }), _jsx("h3", { className: "text-2xl font-semibold text-white mt-1", children: value }), change && (_jsxs("p", { className: "text-sm mt-1", children: [_jsx("span", { className: change.startsWith('+') ? 'text-green-500' : 'text-red-500', children: change }), ' vs último mes'] }))] }), _jsx("div", { className: "bg-dark p-3 rounded-lg", children: _jsx(Icon, { className: "w-6 h-6 text-primary" }) })] }) }));
const DashboardHome = () => {
    const { user } = useAuth0();
    const stats = [
        { title: 'Visitas Totales', value: '2,345', icon: Activity, change: '+12.3%' },
        { title: 'Clientes Activos', value: '48', icon: Users, change: '+4.5%' },
        { title: 'Tasa de Conversión', value: '3.2%', icon: TrendingUp, change: '+2.1%' },
        { title: 'Ingresos Mensuales', value: '€8,234', icon: BarChart, change: '+15.3%' }
    ];
    return (_jsxs("div", { children: [_jsxs("div", { className: "mb-8", children: [_jsxs("h1", { className: "text-2xl font-bold text-white", children: ["Bienvenido, ", user?.name] }), _jsx("p", { className: "text-gray-400 mt-1", children: "Aqu\u00ED tienes un resumen de tu actividad reciente" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: stats.map((stat, index) => (_jsx(StatCard, { ...stat }, index))) })] }));
};
export default DashboardHome;
