#!/usr/bin/env tsx
/**
 * Use Supabase API to get project info and construct correct connection string
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });

const supabaseUrl = 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';

async function getProjectInfo() {
  console.log('🔍 Getting Supabase project information via API...\n');

  if (!supabaseKey) {
    console.error('❌ SUPABASE_KEY not found');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Try to query a system table to verify API works
  try {
    const { data, error } = await supabase.rpc('version');
    console.log('API test result:', { data, error: error?.message });
  } catch (e) {
    console.log('RPC test:', (e as Error).message);
  }

  // Try to get database info via REST API
  // Note: Supabase doesn't expose connection string via API for security
  // But we can test if the API works and infer the connection format

  console.log('\n📝 Since Supabase API doesn\'t expose connection strings,');
  console.log('   you need to get it from the dashboard:\n');
  console.log('   1. Go to: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database');
  console.log('   2. Scroll to "Connection string" section');
  console.log('   3. Copy the "URI" connection string');
  console.log('   4. It will look like one of these formats:\n');
  
  console.log('   Format A (Direct):');
  console.log('   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres');
  console.log('');
  console.log('   Format B (Pooler):');
  console.log('   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres');
  console.log('');
  console.log('   Format C (Simple):');
  console.log('   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres');
  console.log('');
  console.log('   5. Replace [PASSWORD] with: xfoH4B7jNt7TQOw5');
  console.log('   6. The [REGION] will be shown in your dashboard\n');
}

getProjectInfo();

