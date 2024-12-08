import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
const Button = ({ isLoading, variant = 'primary', children, className = '', disabled, ...props }) => {
    const baseStyles = "w-full flex items-center justify-center px-4 py-2 rounded-md transition-colors disabled:opacity-50";
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-light",
        secondary: "bg-dark text-white border border-gray-700 hover:bg-dark-light"
    };
    return (_jsx("button", { disabled: isLoading || disabled, className: `${baseStyles} ${variants[variant]} ${className}`, ...props, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin h-5 w-5 mr-2" }), "Cargando..."] })) : children }));
};
export default Button;
