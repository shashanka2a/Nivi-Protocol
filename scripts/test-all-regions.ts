#!/usr/bin/env tsx
/**
 * Test all possible Supabase connection string combinations
 */

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });

const password = 'xfoH4B7jNt7TQOw5';
const projectRef = 'xnzruzquuvovtucbqdrw';

const regions = [
  'us-east-1', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-central-1', 'eu-north-1',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-south-1',
  'ca-central-1', 'sa-east-1',
];

const formats = [
  (r: string) => `postgresql://postgres.${projectRef}:${password}@aws-0-${r}.pooler.supabase.com:6543/postgres`,
  (r: string) => `postgresql://postgres.${projectRef}:${password}@aws-0-${r}.pooler.supabase.com:5432/postgres`,
  (r: string) => `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`,
  (r: string) => `postgresql://postgres.${projectRef}:${password}@${r}.pooler.supabase.com:6543/postgres`,
];

async function testConnection(connString: string): Promise<boolean> {
  try {
    const prisma = new PrismaClient({
      datasources: { db: { url: connString } },
    });
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    return true;
  } catch {
    return false;
  }
}

async function findWorkingConnection() {
  console.log('🔍 Testing all possible connection strings...\n');
  
  // Test simple format first (most common)
  console.log('Testing simple format...');
  const simpleFormat = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
  if (await testConnection(simpleFormat)) {
    console.log('✅ FOUND:', simpleFormat.replace(/:[^:@]+@/, ':****@'));
    return simpleFormat;
  }

  // Test each region
  for (const region of regions) {
    for (let i = 0; i < formats.length; i++) {
      const connString = formats[i](region);
      const display = connString.replace(/:[^:@]+@/, ':****@');
      process.stdout.write(`Testing ${region} format ${i + 1}... `);
      
      if (await testConnection(connString)) {
        console.log('✅ SUCCESS!\n');
        console.log('='.repeat(60));
        console.log('Working connection string:');
        console.log(connString.replace(/:[^:@]+@/, ':****@'));
        console.log('='.repeat(60));
        return connString;
      }
      console.log('❌');
    }
  }
  
  return null;
}

findWorkingConnection().then(async (connString) => {
  if (connString) {
    // Update .env
    const fs = await import('fs');
    const envPath = join(process.cwd(), '.env');
    let envContent = fs.readFileSync(envPath, 'utf-8');
    envContent = envContent.replace(
      /DATABASE_URL=.*/,
      `DATABASE_URL="${connString}"`
    );
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n✅ Updated .env file with working connection string');
    console.log('\n🚀 Now run: npm run push-schema\n');
    process.exit(0);
  } else {
    console.log('\n❌ Could not find working connection string');
    console.log('Please get it from Supabase dashboard\n');
    process.exit(1);
  }
});

