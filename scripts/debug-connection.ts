#!/usr/bin/env tsx
/**
 * Debug database connection with detailed error information
 */

import * as dotenv from 'dotenv';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: join(process.cwd(), '.env') });

const databaseUrl = process.env.DATABASE_URL;

console.log('🔍 Debugging Database Connection\n');
console.log('=' .repeat(60));

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not found in .env');
  process.exit(1);
}

// Parse connection string (hide password)
const urlObj = new URL(databaseUrl.replace('postgresql://', 'http://'));
console.log('📋 Connection Details:');
console.log('   Protocol:', urlObj.protocol.replace('http:', 'postgresql:'));
console.log('   Host:', urlObj.hostname);
console.log('   Port:', urlObj.port || '5432 (default)');
console.log('   Database:', urlObj.pathname.replace('/', '') || 'postgres');
console.log('   User:', urlObj.username || 'postgres');
console.log('   Password:', urlObj.password ? '***' + urlObj.password.slice(-4) : 'not set');
console.log('');

// Test connection with detailed error
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: ['error', 'warn', 'info'],
});

async function debugConnection() {
  console.log('🔌 Attempting connection...\n');
  
  try {
    console.log('Step 1: Connecting to database...');
    await prisma.$connect();
    console.log('✅ Connection established!\n');
    
    console.log('Step 2: Testing query...');
    const result: any = await prisma.$queryRaw`SELECT version() as version, current_database() as database`;
    console.log('✅ Query successful!\n');
    console.log('📊 Database Info:');
    console.log('   Version:', result[0]?.version?.substring(0, 50) || 'N/A');
    console.log('   Database:', result[0]?.database || 'N/A');
    console.log('');
    
    console.log('Step 3: Checking if tables exist...');
    const tables: any = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} existing tables:`);
      tables.forEach((t: any) => console.log('   -', t.table_name));
    } else {
      console.log('ℹ️  No tables found (database is empty - ready for schema push)');
    }
    
    console.log('\n✅ Database is ready for schema push!');
    await prisma.$disconnect();
    process.exit(0);
    
  } catch (error: any) {
    console.error('\n❌ Connection Error Details:\n');
    console.error('Error Code:', error.code || 'N/A');
    console.error('Error Message:', error.message);
    console.error('');
    
    // Provide specific troubleshooting based on error
    if (error.message.includes("Can't reach database server")) {
      console.error('🔍 Troubleshooting:');
      console.error('   1. Check if the hostname is correct');
      console.error('   2. Verify the port number (5432 or 6543)');
      console.error('   3. Check your network/firewall settings');
      console.error('   4. Ensure Supabase project is active');
      console.error('');
      console.error('💡 Try these connection string formats:');
      console.error('   Format 1: postgresql://postgres.xnzruzquuvovtucbqdrw:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres');
      console.error('   Format 2: postgresql://postgres:[PASSWORD]@db.xnzruzquuvovtucbqdrw.supabase.co:5432/postgres');
      console.error('   Format 3: postgresql://postgres.xnzruzquuvovtucbqdrw:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres');
    } else if (error.message.includes("FATAL") || error.message.includes("authentication")) {
      console.error('🔍 Troubleshooting:');
      console.error('   1. Verify the password is correct');
      console.error('   2. Check if the username format is correct');
      console.error('   3. Ensure the database user exists');
    } else if (error.message.includes("Tenant or user not found")) {
      console.error('🔍 Troubleshooting:');
      console.error('   1. The connection string format may be incorrect');
      console.error('   2. Check if you need to use a different username format');
      console.error('   3. Verify the project reference in the connection string');
    }
    
    console.error('');
    console.error('📝 Get the exact connection string from:');
    console.error('   https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database');
    
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

debugConnection();

