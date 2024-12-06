export interface Auth0User {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  [key: string]: any;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface UserPermissions {
  userId: string;
  permissions: string[];
  timestamp: number;
}