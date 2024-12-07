import * as Sentry from '@sentry/react';
import { logger } from '../utils/logger';

export function initializeSentry() {
  if (!process.env.VITE_SENTRY_DSN) {
    logger.warn('Sentry DSN not found, error tracking disabled');
    return;
  }

  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ['localhost', 'pedropalomares.com'],
      }),
    ],
  });
}

export function trackError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

export function trackPerformance(name: string, duration: number) {
  Sentry.addBreadcrumb({
    category: 'performance',
    message: `${name} took ${duration}ms`,
    level: 'info',
  });
}