import React from 'react';
import { Calendar } from 'lucide-react';

const UpcomingConsultations = () => {
  const consultations = [
    {
      client: 'Juan Pérez',
      date: '2024-03-20',
      time: '10:00',
      type: 'Primera Consulta'
    },
    {
      client: 'María García',
      date: '2024-03-21',
      time: '15:30',
      type: 'Seguimiento'
    }
  ];

  return (
    <div className="bg-dark-lighter rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Próximas Consultas</h3>
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      
      <div className="space-y-4">
        {consultations.map((consultation, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-dark rounded-lg">
            <div>
              <p className="font-medium text-white">{consultation.client}</p>
              <span className="text-sm text-gray-400">{consultation.type}</span>
            </div>
            <div className="text-right">
              <p className="text-primary">{consultation.time}</p>
              <span className="text-sm text-gray-400">{consultation.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingConsultations;