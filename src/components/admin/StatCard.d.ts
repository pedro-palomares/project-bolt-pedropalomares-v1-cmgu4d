import React from 'react';
import { LucideIcon } from 'lucide-react';
interface StatCardProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    description: string;
}
declare const StatCard: React.FC<StatCardProps>;
export default StatCard;
