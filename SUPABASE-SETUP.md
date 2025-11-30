# Nivi Protocol Supabase Integration Guide

## 🚀 Quick Setup

### 1. **Database Setup**

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/xnzruzquuvovtucbqdrw)

2. Navigate to **SQL Editor**

3. Copy and paste the contents of `supabase-schema.sql`

4. Click **Run** to execute the schema

### 2. **Environment Variables**

Your `.env` file should have:

```bash
# Supabase Configuration
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenJ1enF1dXZvdnR1Y2JxZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzQ2MzQsImV4cCI6MjA4MDA1MDYzNH0.U0rnFERC1S6Rd-a7QD51fcge9NrU7w6xsCPAIy2KKm8

NEXT_PUBLIC_SUPABASE_URL=https://xnzruzquuvovtucbqdrw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenJ1enF1dXZvdnR1Y2JxZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzQ2MzQsImV4cCI6MjA4MDA1MDYzNH0.U0rnFERC1S6Rd-a7QD51fcge9NrU7w6xsCPAIy2KKm8

# Database Connection String (get from Supabase Dashboard > Settings > Database)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xnzruzquuvovtucbqdrw.supabase.co:5432/postgres
```

**Important:** Get the exact `DATABASE_URL` from:
- Supabase Dashboard → Settings → Database → Connection string
- Copy the "URI" format connection string
- Replace `[YOUR-PASSWORD]` with your database password: `xfoH4B7jNt7TQOw5`

### 3. **Test Connection**

```bash
npm run test-supabase
```

## 📊 Database Schema

### **Core Tables Created:**

- ✅ `users` - User profiles (Creators & Brands)
- ✅ `videos` - Content with metadata
- ✅ `video_stats` - Video statistics
- ✅ `licenses` - Active subscriptions
- ✅ `transactions` - Payment records
- ✅ `withdrawals` - Earnings withdrawals
- ✅ `sessions` - Authentication sessions

### **Features Included:**

- 🔐 **Row Level Security (RLS)** - Users can only access their own data
- 📈 **Comprehensive Indexing** - Optimized for performance
- 🔄 **Real-time Subscriptions** - Live data updates
- 🛡️ **Data Validation** - Type-safe operations
- 📊 **Sample Data** - Ready-to-test with sample users

## 🔧 Integration Features

### **1. Authentication**

```typescript
import { signUp, signIn, signInWithWallet, getCurrentUser } from '@/lib/supabase/auth';

// Sign up with email/password
const { data, error } = await signUp({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  type: 'CREATOR',
});

// Sign in with wallet (Photon)
const { data, error } = await signInWithWallet(
  '0x1234...',
  'John Doe',
  'user@example.com'
);

// Get current user
const user = await getCurrentUser();
```

### **2. Real-time Subscriptions**

```typescript
import { realtimeService } from '@/lib/supabase/realtime';

// Subscribe to user profile updates
const channel = realtimeService.subscribeToUserProfile(userId, (payload) => {
  console.log('User updated:', payload);
});

// Subscribe to license updates
const licenseChannel = realtimeService.subscribeToUserLicenses(userId, (payload) => {
  console.log('License updated:', payload);
});

// Clean up
realtimeService.unsubscribe(channel);
```

### **3. Database Operations**

```typescript
import { supabase } from '@/lib/supabase/client';

// Create video
const { data, error } = await supabase
  .from('videos')
  .insert({
    title: 'My Video',
    description: 'Description',
    thumbnail: 'https://...',
    category: 'Dance',
    price: 10.0,
    creator_id: userId,
  });

// Get user with relations
const { data, error } = await supabase
  .from('users')
  .select(`
    *,
    createdVideos:videos(*),
    activeLicenses:licenses!licenses_subscriber_id_fkey(*)
  `)
  .eq('id', userId)
  .single();
```

## 🎯 Key Benefits

### **1. Seamless Integration**

- **Prisma + Supabase** - Best of both worlds
- **Type Safety** - Full TypeScript support
- **Real-time** - Live data synchronization
- **Authentication** - Built-in user management

### **2. Blockchain Ready**

- **Wallet Integration** - Photon wallet support
- **Transaction Tracking** - Complete transaction history
- **Aptos Integration** - Blockchain payments
- **Event Processing** - Real-time blockchain sync

### **3. Scalable Architecture**

- **Row Level Security** - Data privacy by default
- **Optimized Queries** - Comprehensive indexing
- **Real-time Updates** - WebSocket subscriptions
- **Sample Data** - Ready for development

## 🚀 Next Steps

### **1. Run Database Setup**

1. Copy `supabase-schema.sql` content
2. Paste in Supabase SQL Editor
3. Execute to create all tables

### **2. Update Environment Variables**

1. Get `DATABASE_URL` from Supabase Dashboard
2. Update `.env` file with correct connection string
3. Verify `SUPABASE_KEY` and `NEXT_PUBLIC_SUPABASE_URL` are set

### **3. Test Integration**

```bash
# Test Supabase connection
npm run test-supabase

# Push Prisma schema (optional, for Prisma Client)
npm run push-schema

# Start development server
npm run dev
```

### **4. Use in Your App**

```typescript
// In your components
'use client';

import { supabase } from '@/lib/supabase/client';
import { realtimeService } from '@/lib/supabase/realtime';
import { useEffect, useState } from 'react';

export function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to user updates
    const channel = realtimeService.subscribeToUserProfile(userId, (payload) => {
      if (payload.eventType === 'UPDATE') {
        setUser(payload.new);
      }
    });

    return () => {
      realtimeService.unsubscribe(channel);
    };
  }, [userId]);

  // ...
}
```

## 🛡️ Security Features

### **Row Level Security Policies:**

- Users can only access their own data
- Creator profiles are public for viewing
- Videos are public but only creators can modify
- Licenses are private to subscribers/owners
- Transactions are private to users

### **Authentication Flow:**

1. User connects wallet via Photon
2. `signInWithWallet()` finds or creates user
3. Session token created in `sessions` table
4. Real-time subscriptions activated

## 🎉 Ready to Go!

Your Nivi Protocol now has:

- ✅ **Complete Database Schema**
- ✅ **Real-time Subscriptions**
- ✅ **Authentication System**
- ✅ **Blockchain Integration**
- ✅ **Type Safety**
- ✅ **Security Policies**

Just run the SQL schema in your Supabase dashboard and you're ready to build! 🚀

