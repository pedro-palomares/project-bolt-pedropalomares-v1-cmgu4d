import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { logWarning } from '../../utils/logger';

export const useRequireAuth = (requiredRole?: string) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      logWarning('Unauthorized access attempt', {
        path: location.pathname,
        requiredRole
      });
      navigate(`/login?returnTo=${encodeURIComponent(location.pathname)}`);
      return;
    }

    if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
      logWarning('Insufficient permissions', {
        userId: user.uid,
        userRole: user.role,
        requiredRole,
        path: location.pathname
      });
      navigate('/unauthorized');
    }
  }, [user, loading, requiredRole, navigate, location]);

  return { user, loading };
};