import { prisma } from '../../db/client';
import { logInfo, logError, logWarning } from '../../utils/logger';
import type { Auth0User } from '../types';

export class SyncService {
  private static instance: SyncService;
  private syncInProgress = false;

  private constructor() {}

  static getInstance(): SyncService {
    if (!this.instance) {
      this.instance = new SyncService();
    }
    return this.instance;
  }

  async syncUser(auth0User: Auth0User) {
    try {
      logInfo('Iniciando sincronización de usuario', { userId: auth0User.sub });

      const dbUser = await prisma.user.findUnique({
        where: { auth0Id: auth0User.sub }
      });

      if (!dbUser) {
        await this.createLocalUser(auth0User);
      } else {
        await this.updateLocalUser(dbUser.id, auth0User);
      }

      logInfo('Usuario sincronizado correctamente', { userId: auth0User.sub });
    } catch (error) {
      logError(error as Error, {
        context: 'User Sync',
        userId: auth0User.sub
      });
      throw error;
    }
  }

  private async createLocalUser(auth0User: Auth0User) {
    try {
      await prisma.user.create({
        data: {
          auth0Id: auth0User.sub,
          email: auth0User.email,
          name: auth0User.name || '',
          role: auth0User['https://pedropalomares.com/roles']?.[0] || 'user'
        }
      });
      logInfo('Usuario creado en base de datos local', { userId: auth0User.sub });
    } catch (error) {
      logError(error as Error, {
        context: 'Create Local User',
        userId: auth0User.sub
      });
      throw error;
    }
  }

  private async updateLocalUser(userId: string, auth0User: Auth0User) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          email: auth0User.email,
          name: auth0User.name || '',
          role: auth0User['https://pedropalomares.com/roles']?.[0] || 'user'
        }
      });
      logInfo('Usuario actualizado en base de datos local', { userId: auth0User.sub });
    } catch (error) {
      logError(error as Error, {
        context: 'Update Local User',
        userId: auth0User.sub
      });
      throw error;
    }
  }
}

export const syncService = SyncService.getInstance();