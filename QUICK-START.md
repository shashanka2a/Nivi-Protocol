# 🚀 Quick Start: Push Prisma Schema to Supabase

## Step 1: Get Your Database Connection String

1. Go to: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database
2. Scroll to **Connection string** section
3. Click **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with: `xfoH4B7jNt7TQOw5`
6. Add `?sslmode=require` at the end if not present

Example:
```
postgresql://postgres:[PASSWORD]@db.xnzruzquuvovtucbqdrw.supabase.co:5432/postgres?sslmode=require
```

## Step 2: Update .env File

Open `.env` and update `DATABASE_URL`:

```bash
DATABASE_URL="postgresql://postgres:xfoH4B7jNt7TQOw5@db.xnzruzquuvovtucbqdrw.supabase.co:5432/postgres?sslmode=require"
```

## Step 3: Push Schema

```bash
npm run push-prisma
```

This will:
- ✅ Test database connection with SSL
- ✅ Generate Prisma Client
- ✅ Create all tables in Supabase
- ✅ Verify tables were created

## Step 4: Verify

```bash
npm run test-supabase
```

All tables should show as ✅ existing.

## Troubleshooting

**Connection fails?**
- Verify the connection string is exactly as shown in Supabase dashboard
- Check that password is correct: `xfoH4B7jNt7TQOw5`
- Ensure `?sslmode=require` is at the end

**Tables not created?**
- Check Supabase dashboard → Table Editor
- Verify RLS policies are enabled
- Check SQL Editor for any errors

## Next Steps

Once tables are created:
- ✅ Use Supabase client: `import { supabase } from '@/lib/supabase/client'`
- ✅ Use authentication: `import { signInWithWallet } from '@/lib/supabase/auth'`
- ✅ Use real-time: `import { realtimeService } from '@/lib/supabase/realtime'`

See `SUPABASE-SETUP.md` for complete documentation.

