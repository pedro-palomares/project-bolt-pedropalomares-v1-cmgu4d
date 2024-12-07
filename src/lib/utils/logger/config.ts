export const getLogLevel = (): string => {
  if (typeof window !== 'undefined') {
    return import.meta.env.DEV ? 'debug' : 'info';
  }
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
};

export const DEFAULT_CONFIG = {
  level: getLogLevel(),
  prefix: '[App]',
  metadata: {
    environment: typeof window !== 'undefined' ? import.meta.env.MODE : process.env.NODE_ENV
  }
} as const;