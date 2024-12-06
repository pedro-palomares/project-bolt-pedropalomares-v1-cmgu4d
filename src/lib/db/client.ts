import { logInfo, logError } from '../utils/logger';

// Interfaz básica para operaciones de base de datos
interface DBClient {
  user: {
    findUnique: (args: any) => Promise<any>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  session: {
    create: (args: any) => Promise<any>;
    findUnique: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
}

// Cliente de base de datos en memoria para desarrollo
class InMemoryDBClient implements DBClient {
  private users: any[] = [];
  private sessions: any[] = [];

  user = {
    findUnique: async ({ where }: any) => {
      logInfo('Buscando usuario', where);
      return this.users.find(u => 
        (where.id && u.id === where.id) || 
        (where.email && u.email === where.email) ||
        (where.auth0Id && u.auth0Id === where.auth0Id)
      );
    },
    create: async ({ data }: any) => {
      logInfo('Creando usuario', data);
      const user = { id: Date.now().toString(), ...data };
      this.users.push(user);
      return user;
    },
    update: async ({ where, data }: any) => {
      logInfo('Actualizando usuario', { where, data });
      const index = this.users.findIndex(u => u.id === where.id);
      if (index >= 0) {
        this.users[index] = { ...this.users[index], ...data };
        return this.users[index];
      }
      return null;
    },
    delete: async ({ where }: any) => {
      logInfo('Eliminando usuario', where);
      const index = this.users.findIndex(u => u.id === where.id);
      if (index >= 0) {
        return this.users.splice(index, 1)[0];
      }
      return null;
    }
  };

  session = {
    create: async ({ data }: any) => {
      logInfo('Creando sesión', data);
      const session = { id: Date.now().toString(), ...data };
      this.sessions.push(session);
      return session;
    },
    findUnique: async ({ where }: any) => {
      logInfo('Buscando sesión', where);
      return this.sessions.find(s => 
        (where.id && s.id === where.id) || 
        (where.token && s.token === where.token)
      );
    },
    delete: async ({ where }: any) => {
      logInfo('Eliminando sesión', where);
      const index = this.sessions.findIndex(s => s.id === where.id);
      if (index >= 0) {
        return this.sessions.splice(index, 1)[0];
      }
      return null;
    }
  };
}

// Crear y exportar la instancia del cliente
const db = new InMemoryDBClient();
export { db as prisma };