import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { createBackup, restoreBackup } from '../index';
import { validateDatabase } from '../../validation';
import { prisma } from '../../client';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

describe('Database Backup System', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a backup successfully', async () => {
    const result = await createBackup();
    
    expect(result.success).toBe(true);
    expect(result.filename).toBeDefined();
    
    if (result.filename) {
      const backupPath = join(process.cwd(), 'backups', result.filename);
      const encryptedPath = `${backupPath}.enc`;
      
      // Verify encrypted file exists
      expect(existsSync(encryptedPath)).toBe(true);
      
      // Cleanup
      if (existsSync(encryptedPath)) {
        unlinkSync(encryptedPath);
      }
    }
  });

  it('should restore a backup successfully', async () => {
    // First create a backup
    const createResult = await createBackup();
    expect(createResult.success).toBe(true);
    
    if (createResult.filename) {
      // Then restore it
      const restoreResult = await restoreBackup(createResult.filename);
      expect(restoreResult.success).toBe(true);
      
      // Verify database state
      const validationResult = await validateDatabase();
      expect(validationResult.success).toBe(true);
      
      // Cleanup
      const backupPath = join(process.cwd(), 'backups', createResult.filename);
      const encryptedPath = `${backupPath}.enc`;
      if (existsSync(encryptedPath)) {
        unlinkSync(encryptedPath);
      }
    }
  });

  it('should handle backup failures gracefully', async () => {
    // Mock DATABASE_URL to be invalid
    const originalEnv = process.env.DATABASE_URL;
    process.env.DATABASE_URL = 'invalid-url';
    
    const result = await createBackup();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    
    // Restore environment
    process.env.DATABASE_URL = originalEnv;
  });

  it('should encrypt backups securely', async () => {
    const result = await createBackup();
    expect(result.success).toBe(true);
    
    if (result.filename) {
      const encryptedPath = join(process.cwd(), 'backups', `${result.filename}.enc`);
      
      // Read first few bytes of encrypted file
      const buffer = Buffer.alloc(16);
      const fd = require('fs').openSync(encryptedPath, 'r');
      require('fs').readSync(fd, buffer, 0, 16, 0);
      require('fs').closeSync(fd);
      
      // Verify it's not plaintext
      const isPlaintext = buffer.toString().match(/^CREATE TABLE|^--/);
      expect(isPlaintext).toBeNull();
      
      // Cleanup
      if (existsSync(encryptedPath)) {
        unlinkSync(encryptedPath);
      }
    }
  });
});