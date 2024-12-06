import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Settings, User, LogOut } from 'lucide-react';
import Logo from '../Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-dark-lighter border-r border-gray-800">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Link to="/" className="block mb-6">
              <Logo />
            </Link>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                {user?.picture ? (
                  <img src={user.picture} alt={user?.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-white font-medium">{user?.name}</h2>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Perfil</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Configuración</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark rounded-lg transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 w-full">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;