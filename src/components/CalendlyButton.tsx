import React from 'react';
import { Calendar } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const CalendlyButton = () => {
  const handleClick = () => {
    trackEvent('CTA', 'Click', 'Schedule Consultation');
    window.open('https://calendly.com/pedro-digitalcoach/30min', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
    >
      <Calendar className="w-5 h-5 mr-2" />
      Agenda una consulta
    </button>
  );
};

export default CalendlyButton;