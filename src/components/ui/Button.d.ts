import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
