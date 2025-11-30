#!/usr/bin/env tsx
/**
 * Get Supabase project info and detect correct database connection
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { writeFileSync } from 'fs';

dotenv.config({ path: join(process.cwd(), '.env') });

const supabaseUrl = 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';
const password = 'xfoH4B7jNt7TQOw5';
const projectRef = 'xnzruzquuvovtucbqdrw';

async function getSupabaseInfo() {
  console.log('🔍 Getting Supabase project information...\n');

  if (!supabaseKey) {
    console.error('❌ SUPABASE_KEY not found');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Try to get project info via API
  try {
    // Test connection
    const { data, error } = await supabase.from('_prisma_migrations').select('count').limit(1);
    
    if (error && error.code !== 'PGRST116') {
      console.log('API Response:', error);
    } else {
      console.log('✅ Supabase API connection successful\n');
    }
  } catch (e) {
    console.log('ℹ️  API test completed\n');
  }

  // Try different connection string formats based on common Supabase patterns
  // The actual format should be from the dashboard, but we'll test common ones
  console.log('📝 Common Supabase connection string formats:\n');
  
  const formats = [
    {
      name: 'Direct Connection (Port 5432)',
      string: `postgresql://postgres.${projectRef}:${password}@db.${projectRef}.supabase.co:5432/postgres`,
    },
    {
      name: 'Pooler Connection (Port 6543)',
      string: `postgresql://postgres.${projectRef}:${password}@aws-0-[REGION].pooler.supabase.com:6543/postgres`,
    },
    {
      name: 'Pooler Direct (Port 5432)',
      string: `postgresql://postgres.${projectRef}:${password}@aws-0-[REGION].pooler.supabase.com:5432/postgres`,
    },
  ];

  formats.forEach((fmt, i) => {
    console.log(`${i + 1}. ${fmt.name}:`);
    console.log(`   ${fmt.string.replace(/:[^:@]+@/, ':****@')}\n`);
  });

  console.log('💡 To get the EXACT connection string:');
  console.log('   1. Go to: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database');
  console.log('   2. Copy the "Connection string" (URI format)');
  console.log('   3. Replace [YOUR-PASSWORD] with your password');
  console.log('   4. Update .env DATABASE_URL\n');
}

getSupabaseInfo();

