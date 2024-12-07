import type { AnalyticsProvider, TrackingEvent, PageView } from '../types';

export class FacebookPixelProvider implements AnalyticsProvider {
  private readonly pixelId: string;

  constructor(pixelId: string) {
    this.pixelId = pixelId;
  }

  initialize(): void {
    if (typeof window === 'undefined' || window.fbq) return;

    // Initialize Facebook Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${this.pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }

  trackEvent({ action, category, label }: TrackingEvent): void {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    window.fbq('track', action, {
      category,
      label
    });
  }

  trackPageView(): void {
    if (typeof window === 'undefined' || !window.fbq) return;
    
    window.fbq('track', 'PageView');
  }
}

declare global {
  interface Window {
    fbq: any;
  }
}