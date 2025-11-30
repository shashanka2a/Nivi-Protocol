#!/usr/bin/env tsx
/**
 * Script to push Prisma schema to Supabase database
 * 
 * Usage:
 *   npm run push-schema
 *   or
 *   npx tsx scripts/push-schema.ts
 */

import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables
const rootDir = process.cwd();

dotenv.config({ path: join(rootDir, '.env') });

const supabaseUrl = 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseKey) {
  console.error('❌ Error: SUPABASE_KEY environment variable is not set');
  console.error('Please add SUPABASE_KEY to your .env file');
  process.exit(1);
}

// Extract database connection string from Supabase URL
// Supabase PostgreSQL connection string format:
// postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
// But we need to get the direct connection string

console.log('🚀 Starting schema push to Supabase...\n');

try {
  // Check if DATABASE_URL is set
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl || databaseUrl.includes('[YOUR-PASSWORD]')) {
    console.error('❌ Error: DATABASE_URL is not properly configured');
    if (databaseUrl?.includes('[YOUR-PASSWORD]')) {
      console.error('\n⚠️  DATABASE_URL contains placeholder [YOUR-PASSWORD]');
    }
    console.error('\n📝 To get your Supabase connection string:');
    console.error('1. Go to: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw');
    console.error('2. Navigate to Settings > Database');
    console.error('3. Copy the "Connection string" under "Connection pooling" (port 6543)');
    console.error('4. Update DATABASE_URL in your .env file');
    console.error('\nExample format:');
    console.error('DATABASE_URL="postgresql://postgres.xnzruzquuvovtucbqdrw:your-actual-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"');
    console.error('\n💡 The connection string already includes your password - just copy it directly!');
    process.exit(1);
  }

  console.log('✅ DATABASE_URL found');
  console.log('📦 Generating Prisma Client...\n');

  // Generate Prisma Client
  execSync('npx prisma generate', {
    cwd: rootDir,
    stdio: 'inherit',
  });

  console.log('\n📤 Pushing schema to database...\n');

  // Push schema to database
  execSync('npx prisma db push --accept-data-loss', {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
  });

  console.log('\n✅ Schema successfully pushed to Supabase!');
  console.log('\n📊 Next steps:');
  console.log('1. Verify tables in Supabase dashboard (Table Editor)');
  console.log('2. Run: npx prisma studio (to view your database)');
  console.log('3. Start using the database in your application\n');

} catch (error) {
  console.error('\n❌ Error pushing schema:', error);
  process.exit(1);
}

