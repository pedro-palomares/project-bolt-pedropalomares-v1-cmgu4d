import React from 'react';
import { Activity } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: 'user',
      message: 'Nuevo usuario registrado',
      time: 'Hace 5 minutos'
    },
    {
      type: 'article',
      message: 'Artículo publicado: "Automatización con IA"',
      time: 'Hace 2 horas'
    },
    {
      type: 'consultation',
      message: 'Nueva consulta agendada',
      time: 'Hace 3 horas'
    }
  ];

  return (
    <div className="bg-dark-lighter rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Actividad Reciente</h3>
        <Activity className="h-5 w-5 text-primary" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <div>
              <p className="text-gray-300">{activity.message}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;