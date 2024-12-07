export const ANALYTICS_CONFIG = {
  facebook: {
    pixelId: import.meta.env.VITE_FB_PIXEL_ID || null
  }
} as const;