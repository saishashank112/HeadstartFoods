const { execSync } = require('child_process');
const env = { ...process.env, DATABASE_URL: 'mysql://root:root@127.0.0.1:3306/headstart_foods' };
try {
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit', env });
  console.log('Success!');
} catch (e) {
  console.error('Failed:', e.message);
}
