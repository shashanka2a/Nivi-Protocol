#!/usr/bin/env tsx
/**
 * Detect correct Supabase connection string by testing different regions
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });

const supabaseUrl = 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';
const password = 'xfoH4B7jNt7TQOw5';
const projectRef = 'xnzruzquuvovtucbqdrw';

// Common Supabase regions
const regions = [
  'us-east-1',
  'us-west-1',
  'eu-west-1',
  'eu-central-1',
  'ap-southeast-1',
  'ap-northeast-1',
];

// Test connection formats
const connectionFormats = [
  // Format 1: Pooler with project ref in username
  (region: string) => `postgresql://postgres.${projectRef}:${password}@aws-0-${region}.pooler.supabase.com:6543/postgres`,
  // Format 2: Direct connection
  (region: string) => `postgresql://postgres.${projectRef}:${password}@aws-0-${region}.pooler.supabase.com:5432/postgres`,
  // Format 3: Simple format
  (region: string) => `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`,
];

async function testConnection(connectionString: string): Promise<boolean> {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });
    
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    return true;
  } catch (error) {
    return false;
  }
}

async function detectConnection() {
  console.log('🔍 Detecting correct Supabase connection string...\n');
  console.log('Project Ref:', projectRef);
  console.log('Testing regions:', regions.join(', '), '\n');

  // First, try to get info from Supabase API
  if (supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from('_prisma_migrations').select('count').limit(1);
      console.log('✅ Supabase API connection works\n');
    } catch (e) {
      console.log('ℹ️  Supabase API test skipped\n');
    }
  }

  // Test each region and format
  for (const region of regions) {
    console.log(`Testing region: ${region}...`);
    
    for (let i = 0; i < connectionFormats.length; i++) {
      const format = connectionFormats[i];
      const connectionString = format(region);
      
      // Hide password in output
      const displayString = connectionString.replace(/:[^:@]+@/, ':****@');
      process.stdout.write(`  Format ${i + 1}: ${displayString} ... `);
      
      const works = await testConnection(connectionString);
      
      if (works) {
        console.log('✅ SUCCESS!\n');
        console.log('='.repeat(60));
        console.log('✅ Found working connection string:');
        console.log(connectionString.replace(/:[^:@]+@/, ':****@'));
        console.log('='.repeat(60));
        console.log('\n📝 Update your .env file with:');
        console.log(`DATABASE_URL="${connectionString}"\n`);
        return connectionString;
      } else {
        console.log('❌');
      }
    }
  }

  console.log('\n❌ Could not detect connection string automatically');
  console.log('📝 Please get it from: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database');
  return null;
}

detectConnection().then((connectionString) => {
  if (connectionString) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

