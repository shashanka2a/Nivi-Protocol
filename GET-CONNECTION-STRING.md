# ⚠️ IMPORTANT: Get Your Exact Connection String

The connection string format needs to be **exactly** as shown in your Supabase dashboard.

## Steps:

1. **Go to your Supabase Dashboard:**
   - https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw/settings/database

2. **Find "Connection string" section**

3. **Copy the URI connection string** (not the JDBC or other formats)

4. **It should look like one of these:**
   ```
   postgresql://postgres.xnzruzquuvovtucbqdrw:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xnzruzquuvovtucbqdrw.supabase.co:5432/postgres
   ```
   OR another format with your specific region

5. **Replace `[YOUR-PASSWORD]` with:** `xfoH4B7jNt7TQOw5`

6. **Update your `.env` file:**
   ```bash
   # Open .env and replace the DATABASE_URL line with the exact string from Supabase
   ```

7. **Then run:**
   ```bash
   npm run push-schema
   ```

## Quick Copy-Paste:

Once you have the connection string from Supabase dashboard, update `.env`:

```env
DATABASE_URL=postgresql://[EXACT-STRING-FROM-SUPABASE-DASHBOARD]
```

Replace `[YOUR-PASSWORD]` in that string with: `xfoH4B7jNt7TQOw5`

