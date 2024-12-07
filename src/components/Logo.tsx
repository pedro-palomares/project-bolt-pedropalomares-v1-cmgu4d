import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  // Construir la URL del logo basada en el entorno
  const logoUrl = import.meta.env.PROD 
    ? 'https://www.pedropalomares.com/assets/images/logo.svg'
    : '/assets/images/logo.svg';

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoUrl} 
        alt="Pedro Palomares Logo" 
        className="h-8 w-8"
        onError={(e) => {
          // Fallback si la imagen no carga
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/assets/images/logo.svg';
        }}
      />
      <div className="ml-2">
        <span className="text-xl font-bold text-white">palomares</span>
        <div className="text-xs text-gray-400 -mt-1">DIGITAL COACH</div>
      </div>
    </div>
  );
};

export default Logo;