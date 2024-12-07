import { prisma } from '../../db/client';
import { logInfo, logError } from '../../utils/logger';
import { verifyToken } from '../jwt';

export class SessionService {
  private static instance: SessionService;
  private sessions = new Map<string, { userId: string; expiresAt: number }>();

  private constructor() {}

  static getInstance(): SessionService {
    if (!this.instance) {
      this.instance = new SessionService();
    }
    return this.instance;
  }

  async validateSession(token: string): Promise<boolean> {
    try {
      const decoded = verifyToken(token);
      if (!decoded) return false;

      const session = await prisma.session.findFirst({
        where: {
          token,
          expiresAt: {
            gt: new Date()
          }
        }
      });

      return !!session;
    } catch (error) {
      logError(error as Error, { context: 'Session Validation' });
      return false;
    }
  }

  async invalidateAllSessions(userId: string): Promise<void> {
    try {
      await prisma.session.deleteMany({
        where: { userId }
      });
      
      logInfo('Todas las sesiones invalidadas', { userId });
    } catch (error) {
      logError(error as Error, {
        context: 'Invalidate Sessions',
        userId
      });
      throw error;
    }
  }
}

export const sessionService = SessionService.getInstance();