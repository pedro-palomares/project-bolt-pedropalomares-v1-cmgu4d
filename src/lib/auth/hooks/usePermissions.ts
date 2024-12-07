import { useAuth0 } from '@auth0/auth0-react';
import { hasPermission, type UserRole } from '../roles';

export const usePermissions = () => {
  const { user } = useAuth0();
  const userRole = user?.['https://pedropalomares.com/roles']?.[0] as UserRole;

  return {
    hasPermission: (permission: string) => hasPermission(userRole, permission),
    userRole,
    isAdmin: userRole === 'admin'
  };
};