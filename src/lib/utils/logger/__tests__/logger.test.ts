import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { logger, logError, logInfo, logWarning, logDebug } from '../index';

describe('Logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs errors with context', () => {
    const error = new Error('Test error');
    const context = { userId: '123' };
    
    logError(error, context);
    
    expect(console.error).toHaveBeenCalled();
  });

  it('logs info messages with data', () => {
    const message = 'Test info';
    const data = { user: 'test' };
    
    logInfo(message, data);
    
    expect(console.info).toHaveBeenCalled();
  });

  it('logs warnings with data', () => {
    const message = 'Test warning';
    const data = { type: 'validation' };
    
    logWarning(message, data);
    
    expect(console.warn).toHaveBeenCalled();
  });

  it('logs debug messages with data', () => {
    const message = 'Test debug';
    const data = { debug: true };
    
    logDebug(message, data);
    
    expect(console.debug).toHaveBeenCalled();
  });
});