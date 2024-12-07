import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, description }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-dark-lighter p-6 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold text-white mt-1">{value}</h3>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              {description}
            </span>
          </div>
        </div>
        <div className="bg-dark p-3 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;