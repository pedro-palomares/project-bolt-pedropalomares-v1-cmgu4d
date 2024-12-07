import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Image
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      name: 'Dashboard', 
      path: '/admin' 
    },
    { 
      icon: FileText, 
      name: 'Blog', 
      path: '/admin/blog' 
    },
    { 
      icon: Image, 
      name: 'Media', 
      path: '/admin/media' 
    },
    { 
      icon: Users, 
      name: 'Usuarios', 
      path: '/admin/users' 
    },
    { 
      icon: Settings, 
      name: 'Configuración', 
      path: '/admin/settings' 
    }
  ];

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
            isActive(item.path)
              ? 'bg-primary text-white'
              : 'text-gray-300 hover:bg-dark hover:text-white'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-dark-lighter border-r border-gray-800">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Link to="/" className="text-xl font-bold text-white mb-8 block">
              Admin Panel
            </Link>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-white font-medium">{user?.name}</h2>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 px-4">
            <Sidebar />
          </div>

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

export default AdminLayout;