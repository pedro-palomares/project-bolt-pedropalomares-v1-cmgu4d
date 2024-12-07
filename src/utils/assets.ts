import { APP_CONFIG } from '../config/constants';

export const getAssetUrl = (path: string): string => {
  return `${APP_CONFIG.assets.baseUrl}${path}`;
};

export const getImageUrl = (imageName: keyof typeof APP_CONFIG.assets.images): string => {
  const imagePath = APP_CONFIG.assets.images[imageName];
  return getAssetUrl(imagePath);
};