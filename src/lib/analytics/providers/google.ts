import ReactGA from 'react-ga4';
import type { AnalyticsProvider, TrackingEvent, PageView } from '../types';

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