import { SignJWT, jwtVerify } from 'jose';
import { logError } from '../utils/logger';

// Use import.meta.env for Vite environment variables
const JWT_SECRET = new TextEncoder().encode(
  import.meta.env.VITE_JWT_SECRET || 'your-secret-key'
);

const JWT_ISSUER = 'pedropalomares.com';
const JWT_AUDIENCE = 'https://pedropalomares.com/api';

export async function createToken(payload: Record<string, any>): Promise<string> {
  try {
    const jwt = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(JWT_ISSUER)
      .setAudience(JWT_AUDIENCE)
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    return jwt;
  } catch (error) {
    logError(error as Error, { context: 'JWT Creation' });
    throw new Error('Error creating token');
  }
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    return payload;
  } catch (error) {
    logError(error as Error, { context: 'JWT Verification' });
    return null;
  }
}

export async function decodeToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    return payload;
  } catch (error) {
    logError(error as Error, { context: 'JWT Decode' });
    return null;
  }
}