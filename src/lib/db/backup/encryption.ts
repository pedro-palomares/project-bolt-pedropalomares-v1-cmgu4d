import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { promisify } from 'util';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';

const pipelineAsync = promisify(pipeline);

const ALGORITHM = 'aes-256-gcm';
const KEY = process.env.BACKUP_ENCRYPTION_KEY;

if (!KEY) {
  throw new Error('BACKUP_ENCRYPTION_KEY not found in environment variables');
}

export async function encrypt(inputPath: string, outputPath: string): Promise<void> {
  const iv = randomBytes(16);
  const key = Buffer.from(KEY, 'hex');
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const input = createReadStream(inputPath);
  const output = createWriteStream(outputPath);

  // Write IV at the beginning of the file
  output.write(iv);

  await pipelineAsync(input, cipher, output);
}

export async function decrypt(inputPath: string, outputPath: string): Promise<void> {
  const input = createReadStream(inputPath);
  const output = createWriteStream(outputPath);

  // Read IV from the beginning of the file
  const iv = Buffer.alloc(16);
  await new Promise((resolve, reject) => {
    input.read(16);
    input.on('readable', () => {
      const chunk = input.read(16);
      if (chunk) {
        chunk.copy(iv);
        resolve(true);
      }
    });
    input.on('error', reject);
  });

  const key = Buffer.from(KEY, 'hex');
  const decipher = createDecipheriv(ALGORITHM, key, iv);

  await pipelineAsync(input, decipher, output);
}