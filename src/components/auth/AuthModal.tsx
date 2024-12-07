import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Toaster position="top-right" />
      <div className="bg-dark-lighter rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>

        {mode === 'login' ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegisterForm onSuccess={onClose} />
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            {mode === 'login' 
              ? '¿No tienes cuenta? Regístrate' 
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Al {mode === 'login' ? 'iniciar sesión' : 'registrarte'}, aceptas nuestros{' '}
          <a href="/terms" className="text-primary hover:text-primary-light">
            términos y condiciones
          </a>
          {' '}y{' '}
          <a href="/privacy" className="text-primary hover:text-primary-light">
            política de privacidad
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthModal;