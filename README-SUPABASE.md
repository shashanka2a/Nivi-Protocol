# Supabase Setup Guide

This project uses Supabase as the database backend with Prisma ORM.

## Quick Start

### 1. Get Your Database Connection String

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw
2. Navigate to **Settings** > **Database**
3. Scroll down to **Connection string**
4. Copy the **Connection pooling** connection string (port 6543)
5. Replace `[YOUR-PASSWORD]` with your database password

Example format:
```
postgresql://postgres.xnzruzquuvovtucbqdrw:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase API Key (already provided)
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenJ1enF1dXZvdnR1Y2JxZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzQ2MzQsImV4cCI6MjA4MDA1MDYzNH0.U0rnFERC1S6Rd-a7QD51fcge9NrU7w6xsCPAIy2KKm8

# For client-side use (optional)
NEXT_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenJ1enF1dXZvdnR1Y2JxZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzQ2MzQsImV4cCI6MjA4MDA1MDYzNH0.U0rnFERC1S6Rd-a7QD51fcge9NrU7w6xsCPAIy2KKm8

# Database connection string (from step 1)
DATABASE_URL=postgresql://postgres.xnzruzquuvovtucbqdrw:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 3. Push Schema to Database

Run the schema push script:

```bash
npm run push-schema
```

This will:
- Generate Prisma Client
- Push the schema to your Supabase database
- Create all tables and relationships

### 4. Verify Setup

View your database:

```bash
npm run db:studio
```

This opens Prisma Studio where you can view and edit your database.

## Available Scripts

- `npm run push-schema` - Push Prisma schema to Supabase
- `npm run setup-supabase` - Test Supabase connection
- `npm run db:push` - Direct Prisma db push
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma Client

## Using Supabase Client

### Server-side (API routes, Server Components)

```typescript
import { supabase } from '@/lib/supabase';

// Example: Get user
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);
```

### Client-side (Client Components)

```typescript
'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
```

## Database Schema

The schema includes:

- **users** - Creators and Brands
- **videos** - Content with metadata
- **licenses** - Active subscriptions
- **transactions** - Payment records
- **withdrawals** - Earnings withdrawals
- **sessions** - Authentication sessions
- **video_stats** - Video statistics

See `prisma/schema.prisma` for full details.

## Troubleshooting

### Connection Issues

1. Verify your `DATABASE_URL` is correct
2. Check that your database password is correct
3. Ensure you're using the **Connection pooling** string (port 6543)

### Schema Push Fails

1. Make sure `DATABASE_URL` is set in `.env`
2. Check database permissions
3. Try running `npx prisma db push` directly for more detailed error messages

### Prisma Client Not Found

Run:
```bash
npm run db:generate
```

## Security Notes

- Never commit `.env` file to git
- Use `SUPABASE_KEY` for server-side operations
- Use `NEXT_PUBLIC_SUPABASE_KEY` only for client-side (if needed)
- The anon key is safe for client-side use but has Row Level Security (RLS) restrictions

