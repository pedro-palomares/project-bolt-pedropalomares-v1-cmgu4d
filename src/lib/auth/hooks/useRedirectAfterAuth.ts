import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { logInfo, logWarning } from '../../utils/logger';
import { syncService } from '../services/syncService';

export const useRedirectAfterAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading) return;

    const handleAuth = async () => {
      if (isAuthenticated && user) {
        try {
          // Sincronizar usuario con la base de datos local
          await syncService.syncUser(user);

          const userRole = user['https://pedropalomares.com/roles']?.[0];
          const returnTo = new URLSearchParams(window.location.search).get('returnTo');
          
          logInfo('Redirigiendo después de autenticación', {
            userId: user.sub,
            role: userRole,
            returnTo
          });

          // Redirigir basado en el rol y returnTo
          if (userRole === 'admin') {
            navigate(returnTo || '/admin');
          } else {
            navigate(returnTo || '/dashboard');
          }
        } catch (error) {
          logWarning('Error en sincronización de usuario', {
            userId: user.sub,
            error: error instanceof Error ? error.message : 'Error desconocido'
          });
          // Aún redirigimos al usuario, pero registramos el error
          navigate('/dashboard');
        }
      } else if (!isAuthenticated && !isLoading) {
        logWarning('Usuario no autenticado, redirigiendo a inicio');
        navigate('/');
      }
    };

    handleAuth();
  }, [isAuthenticated, user, isLoading, navigate]);

  return { isLoading, isAuthenticated };
};