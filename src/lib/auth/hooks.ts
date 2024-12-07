import { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { setAuthCookie, removeAuthCookie } from './session';
import { logInfo, logError, logWarning } from '../utils/logger';
import { AUTH0_ROLES } from '../../config/auth0';

export const useAuthSetup = () => {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user
  } = useAuth0();
  const { setAuth, clearAuth } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthentication = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    try {
      logInfo('Configurando autenticación', { userId: user.sub });
      
      const accessToken = await getAccessTokenSilently();
      const userRole = user['https://pedropalomares.com/roles']?.[0] || AUTH0_ROLES.USER;

      logInfo('Configuración de autenticación completada', {
        userId: user.sub,
        role: userRole
      });

      setAuth(true, { ...user, role: userRole }, accessToken);
      setAuthCookie(accessToken);

      // Handle redirect after authentication
      if (location.pathname === '/callback') {
        const params = new URLSearchParams(location.search);
        const returnTo = params.get('returnTo');
        const targetPath = returnTo || (userRole === AUTH0_ROLES.ADMIN ? '/admin' : '/dashboard');
        
        logInfo('Redirigiendo después de configuración', {
          userId: user.sub,
          targetPath,
          returnTo
        });
        
        navigate(targetPath, { replace: true });
      }
    } catch (error) {
      logError(error as Error, { 
        context: 'Auth Setup',
        userId: user.sub,
        location: location.pathname
      });
      clearAuth();
      removeAuthCookie();
      navigate('/');
    }
  }, [isAuthenticated, user, getAccessTokenSilently, location, navigate]);

  useEffect(() => {
    if (!isLoading) {
      handleAuthentication();
    }
  }, [handleAuthentication, isLoading]);

  return { isLoading, isAuthenticated };
};

export const useRequireAuth = (requiredRole?: string) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      logWarning('Acceso no autorizado a ruta protegida', {
        path: location.pathname,
        requiredRole
      });
      navigate('/login', { state: { returnTo: location.pathname } });
      return;
    }

    if (requiredRole && user?.['https://pedropalomares.com/roles']?.[0] !== requiredRole) {
      logWarning('Usuario sin rol requerido', {
        userId: user.sub,
        userRole: user['https://pedropalomares.com/roles']?.[0],
        requiredRole,
        path: location.pathname
      });
      navigate('/unauthorized');
    }
  }, [isAuthenticated, isLoading, user, requiredRole, navigate, location]);

  return { isLoading, isAuthenticated, user };
};