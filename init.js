import fs from 'node:fs';

fs.copyFileSync('.env', '.env');

fs.mkdirSync('tmp/pgdata', { recursive: true });
