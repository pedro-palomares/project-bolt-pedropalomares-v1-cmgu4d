import pino from 'pino';
import type { Logger } from './types';

const createBrowserLogger = (): Logger => {
  return pino({
    browser: {
      asObject: true,
      write: {
        debug: (o) => console.debug(o.msg, o),
        info: (o) => console.info(o.msg, o),
        warn: (o) => console.warn(o.msg, o),
        error: (o) => console.error(o.msg, o)
      }
    },
    level: import.meta.env.DEV ? 'debug' : 'info'
  });
};

const createServerLogger = (): Logger => {
  return pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname'
      }
    }
  });
};

export const createLogger = (): Logger => {
  return typeof window !== 'undefined' ? createBrowserLogger() : createServerLogger();
};