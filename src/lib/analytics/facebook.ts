export const FB_PIXEL_ID = 'YOUR-PIXEL-ID'; // Replace with your actual Facebook Pixel ID

export const initializeFacebookPixel = () => {
  if (!window.fbq) return;
  
  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
};

export const trackFacebookEvent = (eventName: string, params?: object) => {
  if (window.fbq) {
    window.fbq('track', eventName, params);
  }
};

declare global {
  interface Window {
    fbq: any;
  }
}