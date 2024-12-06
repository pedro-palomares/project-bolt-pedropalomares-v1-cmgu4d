import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AUTH0_CONFIG } from './config/auth0';
import { initializeAnalytics } from './lib/analytics';
import { logger } from './lib/utils/logger';
import './index.css';

// Initialize logger and analytics
logger.info('Application starting...');
initializeAnalytics();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth0Provider {...AUTH0_CONFIG}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Auth0Provider>
    </HelmetProvider>
  </React.StrictMode>
);

logger.info('Application rendered');