import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../lib/utils/scroll';
import { useAuth } from '../lib/auth/hooks/useAuth';
import Logo from './Logo';
import LoginModal from './auth/LoginModal';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleNavigation = (e, sectionId) => {
        e.preventDefault();
        scrollToSection(sectionId);
        setIsOpen(false);
    };
    const menuItems = [
        { name: 'Inicio', sectionId: 'home' },
        { name: 'Servicios', sectionId: 'services' },
        { name: 'Casos de Éxito', sectionId: 'casos-exito' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contacto', href: '/contact' }
    ];
    return (_jsxs("nav", { className: `fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-lighter/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`, children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx(Link, { to: "/", className: "flex items-center", children: _jsx(Logo, {}) }), _jsxs("div", { className: "hidden md:flex items-center space-x-4", children: [menuItems.map((item) => (item.href ? (_jsx(Link, { to: item.href, className: "text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors", children: item.name }, item.name)) : (_jsx("a", { href: `#${item.sectionId}`, onClick: (e) => handleNavigation(e, item.sectionId), className: "text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors", children: item.name }, item.name)))), user ? (_jsx(Link, { to: "/dashboard", className: "bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors", children: "Dashboard" })) : (_jsxs("button", { onClick: () => setShowLoginModal(true), className: "flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors", children: [_jsx(LogIn, { className: "w-4 h-4" }), _jsx("span", { children: "Iniciar Sesi\u00F3n" })] }))] }), _jsx("div", { className: "md:hidden", children: _jsx("button", { onClick: () => setIsOpen(!isOpen), className: "inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-primary focus:outline-none", children: isOpen ? _jsx(X, { className: "h-6 w-6" }) : _jsx(Menu, { className: "h-6 w-6" }) }) })] }) }), isOpen && (_jsx("div", { className: "md:hidden absolute w-full bg-dark-lighter/95 backdrop-blur-sm border-t border-gray-800", children: _jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1", children: [menuItems.map((item) => (item.href ? (_jsx(Link, { to: item.href, className: "text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium", onClick: () => setIsOpen(false), children: item.name }, item.name)) : (_jsx("a", { href: `#${item.sectionId}`, onClick: (e) => handleNavigation(e, item.sectionId), className: "text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium", children: item.name }, item.name)))), user ? (_jsx(Link, { to: "/dashboard", className: "block w-full text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors", onClick: () => setIsOpen(false), children: "Dashboard" })) : (_jsxs("button", { onClick: () => {
                                setIsOpen(false);
                                setShowLoginModal(true);
                            }, className: "flex items-center justify-center w-full space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors", children: [_jsx(LogIn, { className: "w-4 h-4" }), _jsx("span", { children: "Iniciar Sesi\u00F3n" })] }))] }) })), _jsx(LoginModal, { isOpen: showLoginModal, onClose: () => setShowLoginModal(false) })] }));
};
export default Navbar;
