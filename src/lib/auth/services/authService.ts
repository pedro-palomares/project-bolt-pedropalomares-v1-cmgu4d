import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, createSession } from '../../db/client';
import { createToken } from '../jwt';
import { logInfo, logError } from '../../utils/logger';

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  async register(email: string, password: string, name: string) {
    try {
      // Check if user already exists
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await createUser({
        email,
        name,
        hashedPassword
      });

      // Create session token
      const token = await createToken({ userId: user.id });
      
      // Store session
      await createSession({
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });

      logInfo('Usuario registrado correctamente', { userId: user.id });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      };
    } catch (error) {
      logError(error as Error, { context: 'Auth Service - Register' });
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      const validPassword = await bcrypt.compare(password, user.hashedPassword);
      if (!validPassword) {
        throw new Error('Credenciales inválidas');
      }

      const token = await createToken({ userId: user.id });
      
      await createSession({
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      logInfo('Usuario autenticado correctamente', { userId: user.id });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      };
    } catch (error) {
      logError(error as Error, { context: 'Auth Service - Login' });
      throw error;
    }
  }
}

export const authService = AuthService.getInstance();