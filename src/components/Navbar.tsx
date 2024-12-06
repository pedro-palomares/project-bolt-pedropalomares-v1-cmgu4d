import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth/AuthContext';
import { scrollToSection } from '../lib/utils/scroll';
import Logo from './Logo';
import { logInfo } from '../lib/utils/logger';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isLoading, user, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      scrollToSection(sectionId);
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  const handleLogin = async () => {
    logInfo('Usuario iniciando sesión', { path: location.pathname });
    await login(location.pathname);
  };

  const handleLogout = () => {
    logInfo('Usuario cerrando sesión', { userId: user?.sub });
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Casos de Éxito', href: '/#casos-exito' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-lighter/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={user?.['https://pedropalomares.com/roles']?.[0] === 'admin' ? '/admin' : '/dashboard'}
                    className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-primary/90 hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="bg-primary/90 hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              )}
            </div>
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

      {isOpen && (
        <div className="md:hidden absolute w-full bg-dark-lighter/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
                className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.['https://pedropalomares.com/roles']?.[0] === 'admin' ? '/admin' : '/dashboard'}
                  className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogin();
                }}
                disabled={isLoading}
                className="w-full text-left text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium disabled:opacity-50"
              >
                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;