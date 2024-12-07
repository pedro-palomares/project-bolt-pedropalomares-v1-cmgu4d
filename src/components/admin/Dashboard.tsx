import React from 'react';
import { BarChart, Users, FileText, Calendar } from 'lucide-react';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import UpcomingConsultations from './UpcomingConsultations';
import MetricsChart from './MetricsChart';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Usuarios',
      value: '1,234',
      change: '+12.3%',
      icon: Users,
      description: 'vs. mes anterior'
    },
    {
      title: 'Artículos Publicados',
      value: '45',
      change: '+4.5%',
      icon: FileText,
      description: 'vs. mes anterior'
    },
    {
      title: 'Consultas Agendadas',
      value: '89',
      change: '+15.3%',
      icon: Calendar,
      description: 'vs. mes anterior'
    },
    {
      title: 'Tasa de Conversión',
      value: '3.2%',
      change: '+2.1%',
      icon: BarChart,
      description: 'vs. mes anterior'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Panel de Administración</h1>
        <p className="text-gray-400">
          Vista general del rendimiento y métricas clave
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MetricsChart />
        </div>
        <div className="space-y-8">
          <UpcomingConsultations />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;