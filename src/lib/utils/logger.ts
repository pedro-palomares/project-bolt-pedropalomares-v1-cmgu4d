import log from 'loglevel';

// Configure log level based on environment
const level = import.meta.env.DEV ? 'debug' : 'info';
log.setLevel(level);

// Create a logger interface with structured logging and error handling
export const logger = {
  debug: (message: string, context?: Record<string, any>) => {
    try {
      log.debug(message, context ? JSON.stringify(context) : '');
    } catch (error) {
      console.error('Logging error:', error);
    }
  },
  info: (message: string, context?: Record<string, any>) => {
    try {
      log.info(message, context ? JSON.stringify(context) : '');
    } catch (error) {
      console.error('Logging error:', error);
    }
  },
  warn: (message: string, context?: Record<string, any>) => {
    try {
      log.warn(message, context ? JSON.stringify(context) : '');
    } catch (error) {
      console.error('Logging error:', error);
    }
  },
  error: (error: Error | string, context?: Record<string, any>) => {
    try {
      if (error instanceof Error) {
        log.error(error.message, {
          name: error.name,
          stack: error.stack,
          ...context
        });
      } else {
        log.error(error, context);
      }
    } catch (loggingError) {
      console.error('Logging error:', loggingError);
    }
  }
};

// Helper functions for common logging patterns
export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error(error, context);
};

export const logInfo = (message: string, data?: Record<string, any>) => {
  logger.info(message, data);
};

export const logWarning = (message: string, data?: Record<string, any>) => {
  logger.warn(message, data);
};

export const logDebug = (message: string, data?: Record<string, any>) => {
  logger.debug(message, data);
};

export default logger;