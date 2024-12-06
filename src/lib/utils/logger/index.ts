import { createLogger } from './factory';

const logger = createLogger();

export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error({
    msg: error.message,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...context
    }
  });
};

export const logInfo = (message: string, data?: Record<string, any>) => {
  logger.info({ msg: message, ...data });
};

export const logWarning = (message: string, data?: Record<string, any>) => {
  logger.warn({ msg: message, ...data });
};

export const logDebug = (message: string, data?: Record<string, any>) => {
  logger.debug({ msg: message, ...data });
};

export { logger };
export default logger;