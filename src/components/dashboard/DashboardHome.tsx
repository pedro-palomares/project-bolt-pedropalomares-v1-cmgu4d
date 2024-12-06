import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Activity, Users, TrendingUp, BarChart } from 'lucide-react';

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

const DashboardHome = () => {
  const { user } = useAuth0();

  const stats = [
    { title: 'Visitas Totales', value: '2,345', icon: Activity, change: '+12.3%' },
    { title: 'Clientes Activos', value: '48', icon: Users, change: '+4.5%' },
    { title: 'Tasa de Conversión', value: '3.2%', icon: TrendingUp, change: '+2.1%' },
    { title: 'Ingresos Mensuales', value: '€8,234', icon: BarChart, change: '+15.3%' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-gray-400 mt-1">
          Aquí tienes un resumen de tu actividad reciente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Aquí puedes agregar más secciones como gráficos, tablas, etc. */}
    </div>
  );
};

export default DashboardHome;