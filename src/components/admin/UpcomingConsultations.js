import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar } from 'lucide-react';
const UpcomingConsultations = () => {
    const consultations = [
        {
            client: 'Juan Pérez',
            date: '2024-03-20',
            time: '10:00',
            type: 'Primera Consulta'
        },
        {
            client: 'María García',
            date: '2024-03-21',
            time: '15:30',
            type: 'Seguimiento'
        }
    ];
    return (_jsxs("div", { className: "bg-dark-lighter rounded-xl border border-gray-800 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Pr\u00F3ximas Consultas" }), _jsx(Calendar, { className: "h-5 w-5 text-primary" })] }), _jsx("div", { className: "space-y-4", children: consultations.map((consultation, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-dark rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: consultation.client }), _jsx("span", { className: "text-sm text-gray-400", children: consultation.type })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-primary", children: consultation.time }), _jsx("span", { className: "text-sm text-gray-400", children: consultation.date })] })] }, index))) })] }));
};
export default UpcomingConsultations;
