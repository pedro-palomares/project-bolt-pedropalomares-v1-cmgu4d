import { DEFAULT_CONFIG, shouldLog } from './config';
import type { Logger, LogEntry } from './types';

const formatMessage = (entry: LogEntry): string => {
  const { level, message, timestamp, metadata } = entry;
  let formattedMessage = `${timestamp} ${DEFAULT_CONFIG.prefix} [${level.toUpperCase()}]: ${message}`;
  
  if (metadata && Object.keys(metadata).length > 0) {
    formattedMessage += `\n${JSON.stringify(metadata, null, 2)}`;
  }
  
  return formattedMessage;
};

const createLogEntry = (level: string, message: string, metadata?: Record<string, any>): LogEntry => ({
  level,
  message,
  timestamp: new Date().toISOString(),
  metadata: {
    ...DEFAULT_CONFIG.metadata,
    ...metadata
  }
});

export const browserLogger: Logger = {
  error: (message: string, metadata?: Record<string, any>) => {
    if (shouldLog(DEFAULT_CONFIG.level, 'error')) {
      const entry = createLogEntry('error', message, metadata);
      console.error(formatMessage(entry));
    }
  },

  warn: (message: string, metadata?: Record<string, any>) => {
    if (shouldLog(DEFAULT_CONFIG.level, 'warn')) {
      const entry = createLogEntry('warn', message, metadata);
      console.warn(formatMessage(entry));
    }
  },

  info: (message: string, metadata?: Record<string, any>) => {
    if (shouldLog(DEFAULT_CONFIG.level, 'info')) {
      const entry = createLogEntry('info', message, metadata);
      console.info(formatMessage(entry));
    }
  },

  debug: (message: string, metadata?: Record<string, any>) => {
    if (shouldLog(DEFAULT_CONFIG.level, 'debug')) {
      const entry = createLogEntry('debug', message, metadata);
      console.debug(formatMessage(entry));
    }
  }
};

export default browserLogger;