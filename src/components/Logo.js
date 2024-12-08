import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Logo = ({ className }) => {
    // Construir la URL del logo basada en el entorno
    const logoUrl = import.meta.env.PROD
        ? 'https://www.pedropalomares.com/assets/images/logo.svg'
        : '/assets/images/logo.svg';
    return (_jsxs("div", { className: `flex items-center ${className}`, children: [_jsx("img", { src: logoUrl, alt: "Pedro Palomares Logo", className: "h-8 w-8", onError: (e) => {
                    // Fallback si la imagen no carga
                    const target = e.target;
                    target.onerror = null;
                    target.src = '/assets/images/logo.svg';
                } }), _jsxs("div", { className: "ml-2", children: [_jsx("span", { className: "text-xl font-bold text-white", children: "palomares" }), _jsx("div", { className: "text-xs text-gray-400 -mt-1", children: "DIGITAL COACH" })] })] }));
};
export default Logo;
