import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StatCard = ({ title, value, change, icon: Icon, description }) => {
    const isPositive = change.startsWith('+');
    return (_jsx("div", { className: "bg-dark-lighter p-6 rounded-xl border border-gray-800", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: title }), _jsx("h3", { className: "text-2xl font-semibold text-white mt-1", children: value }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx("span", { className: `text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`, children: change }), _jsx("span", { className: "text-gray-400 text-sm ml-2", children: description })] })] }), _jsx("div", { className: "bg-dark p-3 rounded-lg", children: _jsx(Icon, { className: "w-6 h-6 text-primary" }) })] }) }));
};
export default StatCard;
