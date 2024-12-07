import { logError, logInfo } from '../utils/logger';

const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;

export const initializeFacebookPixel = () => {
  if (!FB_PIXEL_ID) {
    logError(new Error('Facebook Pixel ID not found in environment variables'), { 
      context: 'Facebook Pixel Initialization' 
    });
    return;
  }

  try {
    // Initialize Facebook Pixel
    window.fbq = window.fbq || function() {
      (window.fbq.q = window.fbq.q || []).push(arguments);
    };
    window._fbq = window._fbq || window.fbq;

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');

    // Update noscript img src with actual pixel ID
    const noscriptImg = document.querySelector('noscript img') as HTMLImageElement;
    if (noscriptImg) {
      noscriptImg.src = noscriptImg.src.replace('FACEBOOK_PIXEL_ID', FB_PIXEL_ID);
    }

    logInfo('Facebook Pixel initialized successfully', { pixelId: FB_PIXEL_ID });
  } catch (error) {
    logError(error as Error, { 
      context: 'Facebook Pixel Initialization',
      pixelId: FB_PIXEL_ID 
    });
  }
};

export const trackFacebookEvent = (eventName: string, params?: object) => {
  if (!window.fbq) {
    logError(new Error('Facebook Pixel not initialized'), { 
      context: 'Facebook Event Tracking' 
    });
    return;
  }

  try {
    window.fbq('track', eventName, params);
    logInfo('Facebook event tracked', { event: eventName, params });
  } catch (error) {
    logError(error as Error, { 
      context: 'Facebook Event Tracking',
      event: eventName,
      params 
    });
  }
};

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}