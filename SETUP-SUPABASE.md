# Supabase Setup Instructions

## Quick Setup

### 1. Create `.env` file

Create a `.env` file in the root directory with:

```env
# Supabase API Key
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenJ1enF1dXZvdnR1Y2JxZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzQ2MzQsImV4cCI6MjA4MDA1MDYzNH0.U0rnFERC1S6Rd-a7QD51fcge9NrU7w6xsCPAIy2KKm8

# For client-side use (optional)
NEXT_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenJ1enF1dXZvdnR1Y2JxZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzQ2MzQsImV4cCI6MjA4MDA1MDYzNH0.U0rnFERC1S6Rd-a7QD51fcge9NrU7w6xsCPAIy2KKm8

# Database Connection String
# Get this from: Supabase Dashboard > Settings > Database > Connection string
# Use the "Connection pooling" connection string (port 6543)
DATABASE_URL=postgresql://postgres.xnzruzquuvovtucbqdrw:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### 2. Get Your Database Password

1. Go to: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw
2. Navigate to **Settings** > **Database**
3. Find your database password (or reset it if needed)
4. Copy the **Connection pooling** connection string
5. Replace `[YOUR-PASSWORD]` in the `DATABASE_URL` with your actual password

### 3. Push Schema to Database

Run:

```bash
npm run push-schema
```

This will:
- Generate Prisma Client
- Push all tables to Supabase
- Create all relationships and indexes

### 4. Verify Setup

View your database:

```bash
npm run db:studio
```

## Available Commands

- `npm run push-schema` - Push schema to Supabase
- `npm run setup-supabase` - Test connection
- `npm run db:studio` - Open database viewer
- `npm run db:generate` - Generate Prisma Client

## Using Supabase in Your Code

### Server-side

```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('users')
  .select('*');
```

### Client-side

```typescript
'use client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xnzruzquuvovtucbqdrw.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);
```

## Troubleshooting

**Connection fails?**
- Verify `DATABASE_URL` has correct password
- Check you're using Connection pooling string (port 6543)

**Schema push fails?**
- Make sure `DATABASE_URL` is in `.env` file
- Try `npx prisma db push` directly for detailed errors

