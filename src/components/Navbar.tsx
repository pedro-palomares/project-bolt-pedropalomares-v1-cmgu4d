import React, { useState, useEffect } from 'react';
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

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-lighter/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              item.href ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleNavigation(e, item.sectionId)}
                  className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              )
            ))}

            {user ? (
              <Link
                to="/dashboard"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-dark-lighter/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              item.href ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleNavigation(e, item.sectionId)}
                  className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              )
            ))}

            {user ? (
              <Link
                to="/dashboard"
                className="block w-full text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLoginModal(true);
                }}
                className="flex items-center justify-center w-full space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </nav>
  );
};

export default Navbar;