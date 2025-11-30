#!/usr/bin/env tsx
/**
 * Test Supabase database connection
 */

import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not found in .env');
  process.exit(1);
}

console.log('🔌 Testing database connection...\n');
console.log('Connection string (password hidden):');
console.log(databaseUrl.replace(/:[^:@]+@/, ':****@'));

// Try to connect using Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('\n✅ Successfully connected to database!');
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database query successful');
    console.log('\n📊 Database is ready for schema push');
    
    await prisma.$disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Connection failed:', error.message);
    
    if (error.message.includes("Can't reach database server")) {
      console.error('\n💡 Possible issues:');
      console.error('1. Check if the region in the connection string is correct');
      console.error('2. Try using the direct connection (port 5432) instead of pooler (port 6543)');
      console.error('3. Verify the connection string from Supabase dashboard');
      console.error('\n📝 Get the correct connection string from:');
      console.error('   https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database');
    }
    
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();

