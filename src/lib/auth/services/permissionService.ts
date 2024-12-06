import { logInfo, logError } from '../../utils/logger';
import { prisma } from '../../db/client';

export class PermissionService {
  private static instance: PermissionService;
  private permissionsCache = new Map<string, string[]>();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  static getInstance(): PermissionService {
    if (!this.instance) {
      this.instance = new PermissionService();
    }
    return this.instance;
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    try {
      const cached = this.permissionsCache.get(userId);
      if (cached) {
        return cached;
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true }
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const permissions = this.getRolePermissions(user.role);
      this.permissionsCache.set(userId, permissions);

      setTimeout(() => {
        this.permissionsCache.delete(userId);
      }, this.cacheTTL);

      return permissions;
    } catch (error) {
      logError(error as Error, {
        context: 'Get User Permissions',
        userId
      });
      return [];
    }
  }

  private getRolePermissions(role: string): string[] {
    switch (role) {
      case 'admin':
        return ['*'];
      case 'user':
        return ['read:profile', 'update:profile', 'read:blog'];
      default:
        return [];
    }
  }

  clearCache(userId?: string) {
    if (userId) {
      this.permissionsCache.delete(userId);
      logInfo('Cache de permisos limpiado para usuario', { userId });
    } else {
      this.permissionsCache.clear();
      logInfo('Cache de permisos limpiado completamente');
    }
  }
}

export const permissionService = PermissionService.getInstance();