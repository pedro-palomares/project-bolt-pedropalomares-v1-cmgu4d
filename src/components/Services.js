import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Brain, Target, MessageSquare, Zap, Users, TrendingUp } from 'lucide-react';
const ServiceCard = ({ icon: Icon, title, description }) => (_jsxs("div", { className: "bg-dark-lighter p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800 group", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-dark-light rounded-lg mb-6 group-hover:bg-primary/10 transition-colors", children: _jsx(Icon, { className: "h-6 w-6 text-primary" }) }), _jsx("h3", { className: "text-xl font-semibold mb-4 text-white group-hover:text-primary transition-colors", children: title }), _jsx("p", { className: "text-gray-400 leading-relaxed", children: description })] }));
const Services = () => {
    const services = [
        {
            icon: Brain,
            title: "Soluciones con IA",
            description: "Implementación de herramientas de IA para automatizar y optimizar procesos de venta y atención al cliente."
        },
        {
            icon: Target,
            title: "Estrategias de Ventas",
            description: "Desarrollo de estrategias efectivas para captar y retener clientes, basadas en más de 20 años de experiencia."
        },
        {
            icon: MessageSquare,
            title: "ChatBots Personalizados",
            description: "Automatización inteligente de la atención al cliente mediante chatbots personalizados."
        },
        {
            icon: Zap,
            title: "Automatización",
            description: "Optimización de procesos comerciales mediante la automatización inteligente de tareas repetitivas."
        },
        {
            icon: Users,
            title: "Captación de Clientes",
            description: "Estrategias efectivas para atraer y convertir leads en clientes satisfechos."
        },
        {
            icon: TrendingUp,
            title: "Escalabilidad",
            description: "Soluciones para hacer crecer tu negocio de manera sostenible y eficiente."
        }
    ];
    return (_jsx("section", { id: "services", className: "section-padding bg-dark", children: _jsxs("div", { className: "max-w-7xl mx-auto container-padding", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-white", children: "Mis Servicios" }), _jsx("p", { className: "text-xl text-gray-400 max-w-3xl mx-auto", children: "Combino experiencia en ventas con tecnolog\u00EDa avanzada para ayudarte a alcanzar tus objetivos comerciales" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: services.map((service, index) => (_jsx(ServiceCard, { ...service }, index))) })] }) }));
};
export default Services;
