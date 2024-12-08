import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const MetricsChart = () => {
    const data = [
        { name: 'Ene', usuarios: 400, consultas: 240, articulos: 24 },
        { name: 'Feb', usuarios: 300, consultas: 139, articulos: 18 },
        { name: 'Mar', usuarios: 200, consultas: 980, articulos: 29 },
        { name: 'Abr', usuarios: 278, consultas: 390, articulos: 20 }
    ];
    return (_jsxs("div", { className: "bg-dark-lighter rounded-xl border border-gray-800 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-white mb-6", children: "M\u00E9tricas Mensuales" }), _jsx("div", { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: data, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#282828" }), _jsx(XAxis, { dataKey: "name", stroke: "#808080" }), _jsx(YAxis, { stroke: "#808080" }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: '#1E1E1E',
                                    border: '1px solid #282828',
                                    borderRadius: '0.5rem'
                                } }), _jsx(Line, { type: "monotone", dataKey: "usuarios", stroke: "#DC0000", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "consultas", stroke: "#00DC82", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "articulos", stroke: "#0088FE", strokeWidth: 2 })] }) }) })] }));
};
export default MetricsChart;
