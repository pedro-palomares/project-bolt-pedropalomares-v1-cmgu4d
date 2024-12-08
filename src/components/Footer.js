import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
const SocialLink = ({ href, icon: Icon, label }) => (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "text-gray-400 hover:text-primary transition-colors", "aria-label": label, children: _jsx(Icon, { className: "h-6 w-6" }) }));
const Footer = () => {
    const socialLinks = [
        {
            href: "https://www.instagram.com/pedrodigitalcoach/",
            icon: Instagram,
            label: "Instagram"
        },
        {
            href: "https://x.com/pjpalomares",
            icon: Twitter,
            label: "Twitter"
        },
        {
            href: "https://www.linkedin.com/in/pedro-j-palomares-alonso/",
            icon: Linkedin,
            label: "LinkedIn"
        },
        {
            href: "https://www.youtube.com/@PedroJPalomares",
            icon: Youtube,
            label: "YouTube"
        }
    ];
    return (_jsx("footer", { className: "bg-dark-lighter", children: _jsxs("div", { className: "max-w-7xl mx-auto container-padding py-12", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12", children: [_jsxs("div", { className: "col-span-1 md:col-span-2", children: [_jsx(Logo, {}), _jsx("p", { className: "mt-4 text-gray-400 max-w-md", children: "Ayudo a empresas y emprendedores a escalar sus negocios mediante estrategias digitales, automatizaci\u00F3n e inteligencia artificial." }), _jsx("div", { className: "flex space-x-4 mt-6", children: socialLinks.map((link) => (_jsx(SocialLink, { ...link }, link.label))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-white", children: "Enlaces R\u00E1pidos" }), _jsx("ul", { className: "space-y-3", children: ['Inicio', 'Servicios', 'Sobre Mí', 'Blog', 'Contacto'].map((item) => (_jsx("li", { children: _jsx("a", { href: `#${item.toLowerCase().replace(' ', '-')}`, className: "text-gray-400 hover:text-primary transition-colors", children: item }) }, item))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-white", children: "Contacto" }), _jsxs("ul", { className: "space-y-3", children: [_jsxs("li", { className: "flex items-center space-x-3", children: [_jsx(Phone, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "text-gray-400", children: "+34 619 410 431" })] }), _jsxs("li", { className: "flex items-center space-x-3", children: [_jsx(Mail, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "text-gray-400", children: "contacto@pedropalomares.com" })] }), _jsxs("li", { className: "flex items-center space-x-3", children: [_jsx(MapPin, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "text-gray-400", children: "Barcelona, Espa\u00F1a" })] })] })] })] }), _jsx("div", { className: "border-t border-gray-800 mt-12 pt-8 text-center text-gray-400", children: _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " Pedro Palomares. Todos los derechos reservados."] }) })] }) }));
};
export default Footer;
