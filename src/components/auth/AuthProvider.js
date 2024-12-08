import { jsx as _jsx } from "react/jsx-runtime";
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_CONFIG } from '../../config/auth0';
const AuthProvider = ({ children }) => {
    return (_jsx(Auth0Provider, { domain: AUTH0_CONFIG.domain, clientId: AUTH0_CONFIG.clientId, authorizationParams: {
            redirect_uri: window.location.origin,
            audience: AUTH0_CONFIG.audience,
            scope: AUTH0_CONFIG.scope
        }, children: children }));
};
export default AuthProvider;
