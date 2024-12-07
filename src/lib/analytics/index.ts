import { ANALYTICS_CONFIG } from './config';
import { initializeFacebookPixel, trackFacebookEvent } from './facebook';
import { logInfo, logError } from '../utils/logger';
import type { TrackingEvent } from './types';

export const initializeAnalytics = () => {
  try {
    // Initialize Facebook Pixel if ID is available
    if (ANALYTICS_CONFIG.facebook.pixelId) {
      initializeFacebookPixel();
      logInfo('Analytics services initialized successfully');
    } else {
      logInfo('Facebook Pixel ID not configured, skipping initialization');
    }
  } catch (error) {
    logError(error as Error, { context: 'Analytics Initialization' });
  }
};

export const trackEvent = ({ category, action, label, value }: TrackingEvent) => {
  try {
    // Track event in Facebook Pixel
    if (ANALYTICS_CONFIG.facebook.pixelId) {
      trackFacebookEvent(action, { category, label, value });
    }

    logInfo('Event tracked successfully', { category, action, label, value });
  } catch (error) {
    logError(error as Error, { 
      context: 'Event Tracking',
      event: { category, action, label, value }
    });
  }
};