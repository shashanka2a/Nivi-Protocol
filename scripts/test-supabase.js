/**
 * Test Supabase connection and verify schema
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

if (!supabaseKey) {
  console.error('❌ Error: SUPABASE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseKey.substring(0, 20) + '...\n');

  // Test 1: Basic connection
  console.log('Test 1: Basic API connection...');
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error && error.code !== 'PGRST116') {
      console.log('⚠️  API connected but table might not exist:', error.message);
    } else {
      console.log('✅ API connection successful\n');
    }
  } catch (error) {
    console.log('✅ API connection test completed\n');
  }

  // Test 2: Check if tables exist
  console.log('Test 2: Checking database tables...\n');
  
  const tables = [
    'users',
    'videos',
    'video_stats',
    'licenses',
    'transactions',
    'withdrawals',
    'sessions',
  ];

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      
      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          console.log(`   ❌ ${table}: Table does not exist`);
        } else {
          console.log(`   ⚠️  ${table}: ${error.message}`);
        }
      } else {
        console.log(`   ✅ ${table}: Table exists`);
      }
    } catch (error) {
      console.log(`   ❌ ${table}: ${error.message}`);
    }
  }

  // Test 3: Database connection string
  console.log('\nTest 3: Database connection string...');
  const dbUrl = process.env.DATABASE_URL;
  
  if (dbUrl) {
    console.log('   ✅ DATABASE_URL found');
    const urlObj = new URL(dbUrl.replace('postgresql://', 'http://'));
    console.log('   Host:', urlObj.hostname);
    console.log('   Port:', urlObj.port || '5432');
    console.log('   Database:', urlObj.pathname.replace('/', '') || 'postgres');
  } else {
    console.log('   ⚠️  DATABASE_URL not found in .env');
  }

  console.log('\n' + '='.repeat(60));
  console.log('📝 Next Steps:');
  console.log('='.repeat(60));
  console.log('1. If tables don\'t exist, run supabase-schema.sql in Supabase SQL Editor');
  console.log('2. Verify DATABASE_URL is correct in .env');
  console.log('3. Run: npm run push-schema (to sync Prisma schema)');
  console.log('');
}

testConnection().catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});

