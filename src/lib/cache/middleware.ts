import { Request, Response, NextFunction } from 'express';
import { cacheGet, cacheSet } from './redis';
import { logger } from '../utils/logger';

export async function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'GET') {
    return next();
  }

  const cacheKey = `api:${req.originalUrl}`;

  try {
    // Check cache
    const cachedData = await cacheGet(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Store original send method
    const originalSend = res.json;

    // Override send method to cache response
    res.json = function(body) {
      // Cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const ttl = req.path.includes('/contact') ? 300 : 3600; // 5 min for contact, 1 hour for others
        cacheSet(cacheKey, body, ttl).catch(err => 
          logger.error('Cache set error:', err)
        );
      }
      return originalSend.call(this, body);
    };

    next();
  } catch (error) {
    logger.error('Cache middleware error:', error);
    next();
  }
}