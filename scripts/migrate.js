import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '../database.db');
const MIGRATIONS_PATH = join(__dirname, '../src/lib/db/migrations');

const db = new Database(DB_PATH);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Read and execute migrations
const migrations = readFileSync(join(MIGRATIONS_PATH, '001_initial.sql'), 'utf-8');

console.log('Running migrations...');
db.exec(migrations);
console.log('Migrations completed successfully!');

db.close();