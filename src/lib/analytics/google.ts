import ReactGA from 'react-ga4';
import type { AnalyticsProvider, TrackingEvent, PageView } from './types';

export class GoogleAnalyticsProvider implements AnalyticsProvider {
  private readonly trackingId: string;

  constructor(trackingId: string) {
    this.trackingId = trackingId;
  }

  initialize(): void {
    ReactGA.initialize(this.trackingId);
  }

  trackEvent({ category, action, label, value }: TrackingEvent): void {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
  }

  trackPageView({ path }: PageView): void {
    ReactGA.send({ hitType: "pageview", page: path });
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const initializeGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics ID no encontrado');
    return;
  }

  ReactGA.initialize(GA_TRACKING_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};