export interface TrackingEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface PageView {
  path: string;
  title?: string;
}

export interface AnalyticsProvider {
  initialize(): void;
  trackEvent(event: TrackingEvent): void;
  trackPageView(pageView: PageView): void;
}