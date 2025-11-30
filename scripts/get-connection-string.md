# How to Get Your Supabase Connection String

## Steps:

1. Go to: https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database

2. Scroll down to **Connection string** section

3. You'll see multiple connection strings. Try these in order:

   **Option 1: Direct connection (port 5432)**
   - Click on "URI" tab
   - Copy the connection string
   - Format: `postgresql://postgres.xnzruzquuvovtucbqdrw:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres`

   **Option 2: Connection pooling (port 6543)**
   - Click on "Connection pooling" tab
   - Copy the connection string
   - Format: `postgresql://postgres.xnzruzquuvovtucbqdrw:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

4. Replace `[PASSWORD]` with: `xfoH4B7jNt7TQOw5`

5. The `[REGION]` should be visible in your dashboard (e.g., `us-east-1`, `eu-west-1`, etc.)

6. Update your `.env` file with the complete connection string

## Quick Test:

You can test the connection with:
```bash
psql "postgresql://postgres.xnzruzquuvovtucbqdrw:xfoH4B7jNt7TQOw5@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

