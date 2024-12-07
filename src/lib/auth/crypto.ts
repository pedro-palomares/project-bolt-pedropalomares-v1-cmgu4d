import { logError } from '../utils/logger';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    logError(error as Error, { context: 'Password Hashing' });
    throw new Error('Error al encriptar la contraseña');
  }
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    const hashedPassword = await hashPassword(password);
    return hashedPassword === hash;
  } catch (error) {
    logError(error as Error, { context: 'Password Verification' });
    throw new Error('Error al verificar la contraseña');
  }
};