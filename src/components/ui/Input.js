import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Input = ({ label, error, id, className = '', ...props }) => {
    return (_jsxs("div", { children: [_jsx("label", { htmlFor: id, className: "block text-sm font-medium text-gray-300 mb-1", children: label }), _jsx("input", { id: id, className: `w-full px-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white ${className}`, ...props }), error && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: error }))] }));
};
export default Input;
