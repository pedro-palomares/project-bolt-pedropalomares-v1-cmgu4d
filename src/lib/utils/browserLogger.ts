// Browser-compatible logger for client-side use
export const logger = {
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  
  info: (message: string, ...args: any[]) => {
    console.info(`[INFO] ${message}`, ...args);
  },
  
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
};

export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error(error.message, {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...context
    }
  });
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