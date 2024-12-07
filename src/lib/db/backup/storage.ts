import { createClient } from '@supabase/storage-js';

const storageClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const BUCKET_NAME = 'database-backups';

export async function uploadToStorage(filePath: string, destination: string): Promise<void> {
  const { error } = await storageClient
    .from(BUCKET_NAME)
    .upload(destination, filePath, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }
}

export async function downloadFromStorage(source: string, destination: string): Promise<void> {
  const { data, error } = await storageClient
    .from(BUCKET_NAME)
    .download(source);

  if (error) {
    throw error;
  }

  // Write the file to disk
  const buffer = Buffer.from(await data.arrayBuffer());
  await require('fs').promises.writeFile(destination, buffer);
}