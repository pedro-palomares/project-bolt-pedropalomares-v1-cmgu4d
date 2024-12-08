import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Users, FileText, Calendar } from 'lucide-react';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import UpcomingConsultations from './UpcomingConsultations';
import MetricsChart from './MetricsChart';
const AdminDashboard = () => {
    const stats = [
        {
            title: 'Total Usuarios',
            value: '1,234',
            change: '+12.3%',
            icon: Users,
            description: 'vs. mes anterior'
        },
        {
            title: 'Artículos Publicados',
            value: '45',
            change: '+4.5%',
            icon: FileText,
            description: 'vs. mes anterior'
        },
        {
            title: 'Consultas Agendadas',
            value: '89',
            change: '+15.3%',
            icon: Calendar,
            description: 'vs. mes anterior'
        },
        {
            title: 'Tasa de Conversión',
            value: '3.2%',
            change: '+2.1%',
            icon: BarChart,
            description: 'vs. mes anterior'
        }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white mb-2", children: "Panel de Administraci\u00F3n" }), _jsx("p", { className: "text-gray-400", children: "Vista general del rendimiento y m\u00E9tricas clave" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, index) => (_jsx(StatCard, { ...stat }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(MetricsChart, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(UpcomingConsultations, {}), _jsx(RecentActivity, {})] })] })] }));
};
export default AdminDashboard;
