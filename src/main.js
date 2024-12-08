import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './lib/auth/AuthProvider';
import { initializeAnalytics } from './lib/analytics';
import { logger } from './lib/utils/logger';
import './index.css';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
    },
});
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);
// Initialize application services
try {
    logger.info('Initializing application services...');
    initializeAnalytics();
    logger.info('Application services initialized successfully');
}
catch (error) {
    logger.error('Failed to initialize application services:', error);
}
root.render(_jsx(React.StrictMode, { children: _jsx(HelmetProvider, { children: _jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(App, {}) }) }) }) }) }));
