/**
 * Direct connection test to see exact error
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const DATABASE_URL = process.env.DATABASE_URL;

console.log('Testing connection with:', DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
console.log('');

// Test with different SSL modes
const sslModes = ['require', 'prefer', 'disable', 'allow'];

async function test() {
  for (const sslMode of sslModes) {
    const testUrl = DATABASE_URL.includes('?') 
      ? DATABASE_URL.replace(/sslmode=[^&]*/, `sslmode=${sslMode}`)
      : `${DATABASE_URL}?sslmode=${sslMode}`;
    
    console.log(`Testing with sslmode=${sslMode}...`);
    
    try {
      const prisma = new PrismaClient({
        datasources: {
          db: {
            url: testUrl,
          },
        },
      });

      await prisma.$connect();
      const result = await prisma.$queryRaw`SELECT version() as version, current_database() as database`;
      await prisma.$disconnect();

      console.log(`✅ SUCCESS with sslmode=${sslMode}!`);
      console.log('   Database:', result[0]?.database);
      console.log('   Version:', result[0]?.version?.substring(0, 60));
      console.log('');
      console.log('✅ Working connection string:');
      console.log(testUrl.replace(/:[^:@]+@/, ':****@'));
      console.log('');
      console.log('Update .env with:');
      console.log(`DATABASE_URL="${testUrl}"`);
      process.exit(0);
    } catch (error) {
      const errorMsg = error.message || String(error);
      if (errorMsg.includes('Tenant') || errorMsg.includes('FATAL')) {
        console.log(`   ❌ Authentication error: ${errorMsg.substring(0, 80)}`);
      } else if (errorMsg.includes("Can't reach")) {
        console.log(`   ❌ Cannot reach server`);
      } else {
        console.log(`   ❌ ${errorMsg.substring(0, 80)}`);
      }
    }
  }
  
  console.log('');
  console.log('❌ None of the SSL modes worked');
  console.log('');
  console.log('Possible issues:');
  console.log('  1. Database password might be incorrect');
  console.log('  2. Hostname might be wrong');
  console.log('  3. Database might be paused');
  console.log('  4. Network/firewall blocking connection');
}

test();

