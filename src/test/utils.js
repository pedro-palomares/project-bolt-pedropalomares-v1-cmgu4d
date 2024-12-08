import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth0Provider } from '@auth0/auth0-react';
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});
const auth0Config = {
    domain: 'test.auth0.com',
    clientId: 'test-client-id',
    authorizationParams: {
        redirect_uri: 'http://localhost:3000',
        audience: 'test-audience',
        scope: 'openid profile email'
    }
};
export function renderWithProviders(ui) {
    return render(_jsx(HelmetProvider, { children: _jsx(Auth0Provider, { ...auth0Config, children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: ui }) }) }) }));
}
export * from '@testing-library/react';
