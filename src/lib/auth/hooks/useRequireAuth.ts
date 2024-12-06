import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { logWarning } from '../../utils/logger';
import { permissionService } from '../services/permissionService';
import { sessionService } from '../services/sessionService';

export const useRequireAuth = (requiredRole?: string) => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateAccess = async () => {
      if (isLoading) return;

      if (!isAuthenticated || !user) {
        logWarning('Acceso no autorizado a ruta protegida', {
          path: location.pathname,
          requiredRole
        });
        
        navigate(`/login?returnTo=${encodeURIComponent(location.pathname)}`);
        return;
      }

      try {
        // Validar sesión
        const token = await getAccessTokenSilently();
        const isValidSession = await sessionService.validateSession(token);
        
        if (!isValidSession) {
          throw new Error('Sesión inválida');
        }

        // Verificar permisos si se requiere un rol específico
        if (requiredRole) {
          const permissions = await permissionService.getUserPermissions(user.sub);
          const hasPermission = permissions.includes('*') || 
                              (requiredRole === 'admin' && permissions.includes('admin'));

          if (!hasPermission) {
            logWarning('Usuario sin rol requerido', {
              userId: user.sub,
              userRole: user['https://pedropalomares.com/roles']?.[0],
              requiredRole,
              path: location.pathname
            });
            
            navigate('/unauthorized');
          }
        }
      } catch (error) {
        logWarning('Error validando acceso', {
          userId: user.sub,
          error: error instanceof Error ? error.message : 'Error desconocido'
        });
        navigate('/login');
      }
    };

    validateAccess();
  }, [isAuthenticated, isLoading, user, requiredRole, navigate, location, getAccessTokenSilently]);

  return { isLoading, isAuthenticated, user };
};