import { hashPassword, verifyPassword } from './crypto';
import { logInfo, logError } from '../utils/logger';

export interface User {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  role: 'admin' | 'user';
  createdAt: string;
}

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

class Storage {
  private getUsers(): User[] {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      logError(error as Error, { context: 'Storage - Get Users' });
      return [];
    }
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async createUser(data: { email: string; name: string; password: string }): Promise<User> {
    try {
      const users = this.getUsers();
      
      if (users.some(u => u.email === data.email)) {
        throw new Error('El email ya está registrado');
      }

      const hashedPassword = await hashPassword(data.password);

      const newUser: User = {
        id: crypto.randomUUID(),
        email: data.email,
        name: data.name,
        hashedPassword,
        role: 'user',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      this.saveUsers(users);
      
      logInfo('Usuario creado correctamente', { userId: newUser.id });
      return newUser;
    } catch (error) {
      logError(error as Error, { context: 'Storage - Create User' });
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = this.findUserByEmail(email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const isValid = await verifyPassword(password, user.hashedPassword);
      if (!isValid) {
        throw new Error('Contraseña incorrecta');
      }

      return user;
    } catch (error) {
      logError(error as Error, { context: 'Storage - Validate User' });
      throw error;
    }
  }

  findUserByEmail(email: string): User | undefined {
    return this.getUsers().find(user => user.email === data.email);
  }

  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(CURRENT_USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      logError(error as Error, { context: 'Storage - Get Current User' });
      return null;
    }
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  clearCurrentUser(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export const storage = new Storage();