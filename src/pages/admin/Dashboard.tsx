import React from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Users, FileText, Settings } from 'lucide-react';
import { blogApi } from '../../lib/api/blog';

const StatCard = ({ title, value, icon: Icon, change }: { title: string; value: string; icon: any; change?: string }) => (
  <div className="bg-dark-lighter p-6 rounded-xl border border-gray-800">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold text-white mt-1">{value}</h3>
        {change && (
          <p className="text-sm mt-1">
            <span className={change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {change}
            </span>
            {' vs último mes'}
          </p>
        )}
      </div>
      <div className="bg-dark p-3 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: posts } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: blogApi.getPosts
  });

  const stats = [
    { 
      title: 'Total Usuarios', 
      value: '1,234', 
      icon: Users, 
      change: '+12.3%' 
    },
    { 
      title: 'Artículos Publicados', 
      value: posts?.length.toString() || '0', 
      icon: FileText, 
      change: '+4.5%' 
    },
    { 
      title: 'Visitas Totales', 
      value: '45.2K', 
      icon: BarChart, 
      change: '+15.3%' 
    },
    { 
      title: 'Tasa de Conversión', 
      value: '3.2%', 
      icon: Settings, 
      change: '+2.1%' 
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Panel de Administración
        </h1>
        <p className="text-gray-400 mt-1">
          Bienvenido de nuevo, {user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Add more admin sections here */}
    </div>
  );
};

export default AdminDashboard;