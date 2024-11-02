const { execSync } = require('child_process');
const dotenv = require('dotenv');

dotenv.config({ path: `apps/deepthoughts/.env.${process.env.NODE_ENV}` });

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Provide a migration name');
  process.exit(1);
}

try {
  execSync(`npx prisma migrate dev --name ${migrationName}`, {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}
