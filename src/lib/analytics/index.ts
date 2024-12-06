import { GoogleAnalyticsProvider } from './providers/google';
import { FacebookPixelProvider } from './providers/facebook';
import { ANALYTICS_CONFIG } from './config';
import type { TrackingEvent, PageView } from './types';

const providers = [
  new GoogleAnalyticsProvider(ANALYTICS_CONFIG.google.trackingId),
  new FacebookPixelProvider(ANALYTICS_CONFIG.facebook.pixelId)
];

export const initializeAnalytics = () => {
  providers.forEach(provider => provider.initialize());
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  const event: TrackingEvent = { category, action, label, value };
  providers.forEach(provider => provider.trackEvent(event));
};

export const trackPageView = (path: string, title?: string) => {
  const pageView: PageView = { path, title };
  providers.forEach(provider => provider.trackPageView(pageView));
};