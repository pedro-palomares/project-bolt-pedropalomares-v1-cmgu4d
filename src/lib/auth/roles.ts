export type UserRole = 'admin' | 'user';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RoleConfig {
  name: string;
  permissions: string[];
  description: string;
}

export const ROLES: Record<UserRole, RoleConfig> = {
  admin: {
    name: 'Administrador',
    permissions: ['*'],
    description: 'Acceso completo al sistema'
  },
  user: {
    name: 'Usuario',
    permissions: [
      'read:profile',
      'update:profile',
      'read:blog'
    ],
    description: 'Acceso básico al sistema'
  }
};

export const PERMISSIONS = {
  READ_PROFILE: 'read:profile',
  UPDATE_PROFILE: 'update:profile',
  READ_BLOG: 'read:blog',
  WRITE_BLOG: 'write:blog',
  MANAGE_USERS: 'manage:users',
  MANAGE_ROLES: 'manage:roles'
} as const;

export const hasRole = (userRoles: string[], requiredRole: UserRole): boolean => {
  if (userRoles.includes('admin')) return true;
  return userRoles.includes(requiredRole);
};

export const hasPermission = (userRole: UserRole, requiredPermission: string): boolean => {
  const role = ROLES[userRole];
  if (!role) return false;
  if (role.permissions.includes('*')) return true;
  return role.permissions.includes(requiredPermission);
};

export const getUserPermissions = (role: UserRole): string[] => {
  return ROLES[role]?.permissions || [];
};