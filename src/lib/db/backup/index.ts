import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { format } from 'date-fns';
import { encrypt, decrypt } from './encryption';
import { uploadToStorage, downloadFromStorage } from './storage';
import { sendNotification } from './notifications';
import { prisma } from '../client';
import { validateDatabase } from '../validation';

const execAsync = promisify(exec);

interface BackupResult {
  success: boolean;
  filename?: string;
  error?: string;
}

export async function createBackup(): Promise<BackupResult> {
  try {
    const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm');
    const filename = `backup-${timestamp}.sql`;
    const backupPath = join(process.cwd(), 'backups', filename);
    const encryptedPath = `${backupPath}.enc`;

    // Get database URL from Prisma
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL not found');
    }

    // Create backup using pg_dump
    await execAsync(`pg_dump "${databaseUrl}" > "${backupPath}"`);

    // Encrypt backup
    await encrypt(backupPath, encryptedPath);

    // Upload to secure storage
    await uploadToStorage(encryptedPath, `backups/${filename}.enc`);

    // Send success notification
    await sendNotification({
      type: 'success',
      title: 'Database Backup Success',
      message: `Backup created successfully: ${filename}`,
    });

    return { success: true, filename };
  } catch (error) {
    console.error('Backup failed:', error);
    
    // Send error notification
    await sendNotification({
      type: 'error',
      title: 'Database Backup Failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });

    return { success: false, error: String(error) };
  }
}

export async function restoreBackup(filename: string): Promise<BackupResult> {
  try {
    const backupPath = join(process.cwd(), 'backups', filename);
    const encryptedPath = `${backupPath}.enc`;

    // Download from storage
    await downloadFromStorage(`backups/${filename}.enc`, encryptedPath);

    // Decrypt backup
    await decrypt(encryptedPath, backupPath);

    // Create test database for validation
    const testDbUrl = process.env.TEST_DATABASE_URL;
    if (!testDbUrl) {
      throw new Error('TEST_DATABASE_URL not found');
    }

    // Restore to test database
    await execAsync(`psql "${testDbUrl}" < "${backupPath}"`);

    // Validate restored database
    const validationResult = await validateDatabase();
    if (!validationResult.success) {
      throw new Error('Database validation failed after restore');
    }

    await sendNotification({
      type: 'success',
      title: 'Backup Restore Validation Success',
      message: `Backup ${filename} restored and validated successfully`,
    });

    return { success: true, filename };
  } catch (error) {
    console.error('Restore failed:', error);
    
    await sendNotification({
      type: 'error',
      title: 'Backup Restore Failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });

    return { success: false, error: String(error) };
  }
}