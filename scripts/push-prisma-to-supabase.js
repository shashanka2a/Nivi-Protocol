/**
 * Push Prisma schema to Supabase database
 * Handles SSL connection and creates all tables
 */

require('dotenv').config();
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL not found in .env file');
  process.exit(1);
}

// Parse connection string to check SSL
function parseConnectionString(url) {
  try {
    const urlObj = new URL(url.replace('postgresql://', 'http://'));
    const params = new URLSearchParams(urlObj.search);
    
    return {
      host: urlObj.hostname,
      port: urlObj.port || '5432',
      database: urlObj.pathname.replace('/', '') || 'postgres',
      user: urlObj.username,
      password: urlObj.password,
      sslMode: params.get('sslmode') || 'prefer',
    };
  } catch (error) {
    console.error('❌ Error parsing DATABASE_URL:', error.message);
    process.exit(1);
  }
}

// Ensure SSL is enabled in connection string
function ensureSSL(url) {
  if (!url.includes('sslmode=')) {
    // Add SSL mode if not present
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}sslmode=require`;
  }
  return url;
}

// Use DIRECT_URL for migrations (Prisma db push needs direct connection)
function getDirectConnectionUrl() {
  const directUrl = process.env.DIRECT_URL;
  if (directUrl) {
    return ensureSSL(directUrl);
  }
  // If no DIRECT_URL, try to convert DATABASE_URL from pooler to direct
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.includes(':6543') && dbUrl.includes('pooler')) {
    // Convert pooler (6543) to direct (5432) and remove pgbouncer
    return ensureSSL(dbUrl.replace(':6543', ':5432').replace(/pgbouncer=[^&]*&?/g, ''));
  }
  return ensureSSL(dbUrl);
}

async function testConnection(connectionString) {
  console.log('🔌 Testing database connection...\n');
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });

    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT version() as version, current_database() as database`;
    await prisma.$disconnect();

    console.log('✅ Connection successful!');
    console.log('   Database:', result[0]?.database || 'N/A');
    console.log('   Version:', result[0]?.version?.substring(0, 50) || 'N/A');
    console.log('');
    
    return { success: true, connectionString };
  } catch (error) {
    const errorMsg = error.message || String(error);
    
    // If it's an authentication/tenant error, we reached the server
    if (errorMsg.includes('Tenant') || errorMsg.includes('FATAL')) {
      return { success: false, error: 'Authentication failed - connection string format may be incorrect', connectionString };
    }
    
    // If SSL error, try with different SSL modes
    if (errorMsg.includes('SSL') || errorMsg.includes('sslmode')) {
      console.log('💡 SSL issue detected, trying different SSL modes...');
      
      // Try with sslmode=prefer
      const preferUrl = connectionString.replace(/sslmode=[^&]*/, 'sslmode=prefer');
      if (preferUrl !== connectionString) {
        const result = await testConnection(preferUrl);
        if (result.success) return result;
      }
      
      // Try with sslmode=require
      const requireUrl = connectionString.replace(/sslmode=[^&]*/, 'sslmode=require');
      if (requireUrl !== connectionString) {
        const result = await testConnection(requireUrl);
        if (result.success) return result;
      }
    }
    
    return { success: false, error: errorMsg, connectionString };
  }
}

// Try alternative connection string formats
function tryAlternativeFormats(originalUrl) {
  const urlObj = new URL(originalUrl.replace('postgresql://', 'http://'));
  const password = urlObj.password;
  const projectRef = 'xnzruzquuvovtucbqdrw';
  
  const alternatives = [];
  
  // Format 1: Simple postgres user (no project ref)
  if (urlObj.username.includes('.')) {
    const simpleUrl = originalUrl.replace(/postgres\.[^:@]+/, 'postgres');
    alternatives.push({ name: 'Simple postgres user', url: simpleUrl });
  }
  
  // Format 2: Direct connection (port 5432)
  if (urlObj.port === '6543') {
    const directUrl = originalUrl.replace(':6543', ':5432');
    alternatives.push({ name: 'Direct connection (5432)', url: directUrl });
  }
  
  // Format 3: db. format
  if (urlObj.hostname.includes('aws-0')) {
    const dbUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
    alternatives.push({ name: 'db. format', url: dbUrl });
  }
  
  return alternatives;
}

async function pushSchema(connectionString) {
  console.log('📤 Pushing Prisma schema to Supabase...\n');

  // Use direct connection for migrations (Prisma needs direct connection, not pooler)
  const directUrl = getDirectConnectionUrl();
  console.log('📋 Using direct connection for migrations (port 5432)...\n');

  try {
    // Step 1: Generate Prisma Client
    console.log('Step 1: Generating Prisma Client...');
    execSync('npx prisma generate', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: directUrl,
      },
    });
    console.log('✅ Prisma Client generated\n');

    // Step 2: Push schema to database
    console.log('Step 2: Pushing schema to database (using direct connection)...');
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: directUrl,
      },
    });
    console.log('\n✅ Schema pushed successfully!\n');

    return true;
  } catch (error) {
    console.error('\n❌ Error pushing schema:', error.message);
    return false;
  }
}

async function verifyTables(connectionString) {
  console.log('📊 Verifying tables...\n');

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });

    await prisma.$connect();

    // Check if tables exist
    const tables = [
      'users',
      'videos',
      'video_stats',
      'licenses',
      'transactions',
      'withdrawals',
      'sessions',
    ];

    let allExist = true;
    for (const table of tables) {
      try {
        const result = await prisma.$queryRawUnsafe(
          `SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          ) as exists`,
          table
        );
        
        const exists = result[0]?.exists;
        if (exists) {
          console.log(`   ✅ ${table}`);
        } else {
          console.log(`   ❌ ${table} (not found)`);
          allExist = false;
        }
      } catch (error) {
        console.log(`   ⚠️  ${table} (error checking)`);
        allExist = false;
      }
    }

    await prisma.$disconnect();

    if (allExist) {
      console.log('\n✅ All tables created successfully!\n');
    } else {
      console.log('\n⚠️  Some tables are missing\n');
    }

    return allExist;
  } catch (error) {
    console.error('❌ Error verifying tables:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Prisma to Supabase Schema Push\n');
  console.log('='.repeat(60));
  console.log('');

  // Parse connection info
  const connInfo = parseConnectionString(DATABASE_URL);
  console.log('📋 Connection Details:');
  console.log('   Host:', connInfo.host);
  console.log('   Port:', connInfo.port);
  console.log('   Database:', connInfo.database);
  console.log('   User:', connInfo.user);
  console.log('   SSL Mode:', connInfo.sslMode);
  console.log('');

  // Ensure SSL is enabled
  let connectionString = DATABASE_URL;
  if (!connectionString.includes('sslmode=')) {
    console.log('🔒 Adding SSL to connection string...');
    connectionString = ensureSSL(connectionString);
    console.log('✅ SSL enabled (sslmode=require)\n');
  }

  // Test connection
  let connectionResult = await testConnection(connectionString);
  
  // If connection failed, try alternative formats
  if (!connectionResult.success) {
    console.log('⚠️  Primary connection failed, trying alternative formats...\n');
    
    const alternatives = tryAlternativeFormats(connectionString);
    
    for (const alt of alternatives) {
      console.log(`Trying: ${alt.name}...`);
      const altUrl = ensureSSL(alt.url);
      connectionResult = await testConnection(altUrl);
      
      if (connectionResult.success) {
        console.log(`✅ Success with ${alt.name}!\n`);
        connectionString = connectionResult.connectionString;
        break;
      }
    }
  }
  
  if (!connectionResult.success) {
    console.error('\n❌ Cannot connect to database with any format.');
    console.error('\n📝 Please get the EXACT connection string from:');
    console.error('   https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database');
    console.error('\n💡 Steps:');
    console.error('   1. Go to Settings > Database');
    console.error('   2. Copy the "Connection string" (URI format)');
    console.error('   3. Replace [YOUR-PASSWORD] with: xfoH4B7jNt7TQOw5');
    console.error('   4. Add ?sslmode=require at the end if not present');
    console.error('   5. Update DATABASE_URL in .env file');
    console.error('   6. Run: npm run push-prisma\n');
    console.error('📄 See scripts/get-database-url.md for detailed instructions\n');
    process.exit(1);
  }
  
  // Use the working connection string
  connectionString = connectionResult.connectionString;

  // Push schema
  const pushSuccess = await pushSchema(connectionString);
  
  if (!pushSuccess) {
    console.error('❌ Schema push failed. Check the error messages above.\n');
    process.exit(1);
  }

  // Verify tables
  const tablesExist = await verifyTables(connectionString);

  // Final summary
  console.log('='.repeat(60));
  if (tablesExist) {
    console.log('🎉 Success! All tables created in Supabase');
    console.log('');
    console.log('📊 Next steps:');
    console.log('   1. View database: npm run db:studio');
    console.log('   2. Check tables in Supabase dashboard');
    console.log('   3. Start using Supabase in your app');
    console.log('');
  } else {
    console.log('⚠️  Schema pushed but some tables may be missing');
    console.log('   Check Supabase dashboard for details');
    console.log('');
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

