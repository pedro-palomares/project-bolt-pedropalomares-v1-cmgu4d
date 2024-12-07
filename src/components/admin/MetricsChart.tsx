import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MetricsChart = () => {
  const data = [
    { name: 'Ene', usuarios: 400, consultas: 240, articulos: 24 },
    { name: 'Feb', usuarios: 300, consultas: 139, articulos: 18 },
    { name: 'Mar', usuarios: 200, consultas: 980, articulos: 29 },
    { name: 'Abr', usuarios: 278, consultas: 390, articulos: 20 }
  ];

  return (
    <div className="bg-dark-lighter rounded-xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Métricas Mensuales</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
            <XAxis dataKey="name" stroke="#808080" />
            <YAxis stroke="#808080" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E1E1E',
                border: '1px solid #282828',
                borderRadius: '0.5rem'
              }}
            />
            <Line type="monotone" dataKey="usuarios" stroke="#DC0000" strokeWidth={2} />
            <Line type="monotone" dataKey="consultas" stroke="#00DC82" strokeWidth={2} />
            <Line type="monotone" dataKey="articulos" stroke="#0088FE" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart;