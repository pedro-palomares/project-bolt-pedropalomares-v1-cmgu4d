import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { X, Mail, Loader2, AlertCircle } from 'lucide-react';
import { logError } from '../../lib/utils/logger';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithRedirect } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithRedirect({
        appState: {
          returnTo: window.location.pathname
        },
        authorizationParams: {
          prompt: 'login',
          screen_hint: 'login'
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      setError(errorMessage);
      logError(error as Error, { context: 'Login Modal' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithRedirect({
        appState: {
          returnTo: window.location.pathname
        },
        authorizationParams: {
          prompt: 'login',
          screen_hint: 'signup'
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrarse';
      setError(errorMessage);
      logError(error as Error, { context: 'Signup Modal' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-lighter rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Acceso</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg flex items-center mb-4">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                <Mail className="h-5 w-5" />
                Iniciar Sesión
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-lighter text-gray-400">O</span>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-dark text-white px-4 py-3 rounded-md border border-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;