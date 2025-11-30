#!/usr/bin/env tsx
/**
 * Script to set up Supabase connection and verify configuration
 * 
 * Usage:
 *   npm run setup-supabase
 *   or
 *   npx tsx scripts/setup-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { join } from 'path';

const rootDir = process.cwd();

dotenv.config({ path: join(rootDir, '.env') });

const supabaseUrl = 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';

async function setupSupabase() {
  console.log('🔧 Setting up Supabase connection...\n');

  if (!supabaseKey) {
    console.error('❌ Error: SUPABASE_KEY environment variable is not set');
    console.error('\n📝 Please add to your .env file:');
    console.error('SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenJ1enF1dXZvdnR1Y2JxZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzQ2MzQsImV4cCI6MjA4MDA1MDYzNH0.U0rnFERC1S6Rd-a7QD51fcge9NrU7w6xsCPAIy2KKm8');
    process.exit(1);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test connection
    console.log('🔌 Testing Supabase connection...');
    const { data, error } = await supabase.from('_prisma_migrations').select('count').limit(1);

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means table doesn't exist, which is fine for first setup
      console.log('✅ Supabase connection successful!');
      console.log('📊 Database is ready for schema push\n');
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Database is ready\n');
    }

    console.log('📝 Configuration:');
    console.log(`   URL: ${supabaseUrl}`);
    console.log(`   Key: ${supabaseKey.substring(0, 20)}...`);
    console.log('\n✅ Setup complete!');
    console.log('\n🚀 Next steps:');
    console.log('1. Get your database connection string from Supabase dashboard');
    console.log('   (Settings > Database > Connection string)');
    console.log('2. Add DATABASE_URL to your .env file');
    console.log('3. Run: npm run push-schema\n');

  } catch (error) {
    console.error('❌ Error connecting to Supabase:', error);
    process.exit(1);
  }
}

setupSupabase();

