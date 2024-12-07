import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  isLoading, 
  variant = 'primary', 
  children, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "w-full flex items-center justify-center px-4 py-2 rounded-md transition-colors disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-dark text-white border border-gray-700 hover:bg-dark-light"
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          Cargando...
        </>
      ) : children}
    </button>
  );
};

export default Button;