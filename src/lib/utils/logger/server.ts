import winston from 'winston';
import { DEFAULT_CONFIG } from './config';
import type { Logger } from './types';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} ${DEFAULT_CONFIG.prefix} [${level}]: ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    msg += `\n${JSON.stringify(metadata, null, 2)}`;
  }
  
  return msg;
});

const logger = winston.createLogger({
  level: DEFAULT_CONFIG.level,
  format: combine(
    timestamp(),
    process.env.NODE_ENV === 'development' ? colorize() : winston.format.uncolorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
    })
  ],
  exitOnError: false
});

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine(
      timestamp(),
      winston.format.json()
    )
  }));
}

export const serverLogger: Logger = {
  error: (message: string, metadata?: Record<string, any>) => {
    logger.error(message, metadata);
  },

  warn: (message: string, metadata?: Record<string, any>) => {
    logger.warn(message, metadata);
  },

  info: (message: string, metadata?: Record<string, any>) => {
    logger.info(message, metadata);
  },

  debug: (message: string, metadata?: Record<string, any>) => {
    logger.debug(message, metadata);
  }
};

export default serverLogger;