export interface Logger {
  error: (message: string | Error, data?: Record<string, any>) => void;
  warn: (message: string, data?: Record<string, any>) => void;
  info: (message: string, data?: Record<string, any>) => void;
  debug: (message: string, data?: Record<string, any>) => void;
}

export interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}