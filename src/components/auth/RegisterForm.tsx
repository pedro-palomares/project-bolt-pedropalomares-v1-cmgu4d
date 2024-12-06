import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AlertCircle } from 'lucide-react';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { loginWithRedirect } = useAuth0();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithRedirect({
        appState: {
          returnTo: '/dashboard'
        },
        authorizationParams: {
          screen_hint: 'signup',
          connection: 'google-oauth2',
          prompt: 'login'
        }
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError('Error al registrarse con Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithRedirect({
        appState: {
          returnTo: '/dashboard'
        },
        authorizationParams: {
          screen_hint: 'signup',
          prompt: 'login'
        }
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError('Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleEmailSignUp}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        ) : (
          'Registrarse con Email'
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
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        Registrarse con Google
      </button>
    </div>
  );
};

export default RegisterForm;