import { logInfo, logError } from '../../utils/logger';
import { createToken } from '../jwt';
import { sessionService } from './sessionService';
import { syncService } from './syncService';
import { AuthError, AUTH_ERROR_CODES } from '../errors/AuthError';
import type { Auth0User } from '../types';

export class AuthService {
  private static instance: AuthService;
  private loginAttempts = new Map<string, number>();

  private constructor() {}

  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  async handleAuthentication(auth0User: Auth0User) {
    try {
      logInfo('Iniciando proceso de autenticación', { userId: auth0User.sub });

      // Sincronizar usuario con la base de datos local
      await syncService.syncUser(auth0User);

      // Crear token JWT
      const token = await createToken({
        sub: auth0User.sub,
        email: auth0User.email,
        role: auth0User['https://pedropalomares.com/roles']?.[0] || 'user'
      });

      // Limpiar intentos de login previos
      this.loginAttempts.delete(auth0User.email);

      logInfo('Autenticación exitosa', { userId: auth0User.sub });

      return { token, user: auth0User };
    } catch (error) {
      logError(error as Error, {
        context: 'Authentication',
        userId: auth0User.sub
      });
      throw new AuthError(
        'Error en la autenticación',
        AUTH_ERROR_CODES.INVALID_CREDENTIALS,
        401
      );
    }
  }

  async logout(userId: string) {
    try {
      await sessionService.invalidateAllSessions(userId);
      logInfo('Cierre de sesión exitoso', { userId });
    } catch (error) {
      logError(error as Error, {
        context: 'Logout',
        userId
      });
      throw new AuthError(
        'Error al cerrar sesión',
        AUTH_ERROR_CODES.UNAUTHORIZED,
        401
      );
    }
  }

  private checkRateLimit(email: string): boolean {
    const attempts = this.loginAttempts.get(email) || 0;
    if (attempts >= 5) {
      throw new AuthError(
        'Demasiados intentos de inicio de sesión',
        AUTH_ERROR_CODES.RATE_LIMIT_EXCEEDED,
        429
      );
    }
    this.loginAttempts.set(email, attempts + 1);
    return true;
  }
}

export const authService = AuthService.getInstance();