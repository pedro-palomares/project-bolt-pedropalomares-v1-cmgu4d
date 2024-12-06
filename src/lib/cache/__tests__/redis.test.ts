import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { cacheGet, cacheSet, cacheDelete, cacheFlush, redisClient } from '../redis';

describe('Redis Cache', () => {
  beforeAll(async () => {
    await redisClient.connect();
  });

  afterAll(async () => {
    await cacheFlush();
    await redisClient.quit();
  });

  it('should set and get cached data', async () => {
    const testData = { id: 1, name: 'Test' };
    await cacheSet('test-key', testData);
    const cached = await cacheGet('test-key');
    expect(cached).toEqual(testData);
  });

  it('should handle TTL correctly', async () => {
    await cacheSet('ttl-key', 'test-value', 1);
    let value = await cacheGet('ttl-key');
    expect(value).toBe('test-value');

    // Wait for TTL to expire
    await new Promise(resolve => setTimeout(resolve, 1100));
    value = await cacheGet('ttl-key');
    expect(value).toBeNull();
  });

  it('should delete cached data', async () => {
    await cacheSet('delete-key', 'test-value');
    await cacheDelete('delete-key');
    const value = await cacheGet('delete-key');
    expect(value).toBeNull();
  });
});