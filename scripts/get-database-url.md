# How to Get Your Supabase Database Connection String

## Quick Steps:

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw

2. **Navigate to Settings:**
   - Click on **Settings** in the left sidebar
   - Click on **Database**

3. **Get Connection String:**
   - Scroll down to **Connection string** section
   - You'll see multiple tabs: **URI**, **JDBC**, **Golang**, etc.
   - Click on the **URI** tab
   - Copy the connection string

4. **It will look like one of these:**
   ```
   postgresql://postgres.xnzruzquuvovtucbqdrw:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xnzruzquuvovtucbqdrw.supabase.co:5432/postgres
   ```

5. **Replace [YOUR-PASSWORD] with:** `xfoH4B7jNt7TQOw5`

6. **Update .env file:**
   ```bash
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres?sslmode=require"
   ```

7. **Run the push script:**
   ```bash
   npm run push-prisma
   ```

## Important Notes:

- The connection string from Supabase dashboard is the **exact** format you need
- The region (e.g., `us-east-1`, `eu-west-1`) will be shown in your dashboard
- Always use `?sslmode=require` for secure connections
- The password is: `xfoH4B7jNt7TQOw5`

