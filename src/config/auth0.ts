import { Auth0ClientOptions } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const scope = import.meta.env.VITE_AUTH0_SCOPE;

if (!domain || !clientId || !audience) {
  throw new Error('Auth0 configuration is missing required environment variables');
}

export const AUTH0_CONFIG: Auth0ClientOptions = {
  domain,
  clientId,
  authorizationParams: {
    redirect_uri: `${window.location.origin}/callback`,
    audience,
    scope
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
  skipRedirectCallback: window.location.pathname === '/callback'
};

export const AUTH0_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

export const getRedirectUri = (returnTo?: string) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/callback${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`;
};