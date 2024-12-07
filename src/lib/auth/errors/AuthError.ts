export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AuthError';
  }

  toJSON() {
    return {
      error: this.message,
      code: this.code,
      status: this.status,
      context: this.context
    };
  }
}

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'auth/invalid-credentials',
  SESSION_EXPIRED: 'auth/session-expired',
  INVALID_TOKEN: 'auth/invalid-token',
  UNAUTHORIZED: 'auth/unauthorized',
  RATE_LIMIT_EXCEEDED: 'auth/rate-limit-exceeded',
  SYNC_ERROR: 'auth/sync-error'
} as const;