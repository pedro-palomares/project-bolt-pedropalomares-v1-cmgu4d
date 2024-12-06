import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_CONFIG } from '../../config/auth0';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Auth0Provider
      domain={AUTH0_CONFIG.domain}
      clientId={AUTH0_CONFIG.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0_CONFIG.audience,
        scope: AUTH0_CONFIG.scope
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;