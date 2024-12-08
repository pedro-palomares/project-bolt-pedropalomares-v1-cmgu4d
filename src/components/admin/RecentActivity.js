import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Activity } from 'lucide-react';
const RecentActivity = () => {
    const activities = [
        {
            type: 'user',
            message: 'Nuevo usuario registrado',
            time: 'Hace 5 minutos'
        },
        {
            type: 'article',
            message: 'Artículo publicado: "Automatización con IA"',
            time: 'Hace 2 horas'
        },
        {
            type: 'consultation',
            message: 'Nueva consulta agendada',
            time: 'Hace 3 horas'
        }
    ];
    return (_jsxs("div", { className: "bg-dark-lighter rounded-xl border border-gray-800 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Actividad Reciente" }), _jsx(Activity, { className: "h-5 w-5 text-primary" })] }), _jsx("div", { className: "space-y-4", children: activities.map((activity, index) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-primary rounded-full mt-2" }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-300", children: activity.message }), _jsx("span", { className: "text-sm text-gray-500", children: activity.time })] })] }, index))) })] }));
};
export default RecentActivity;
