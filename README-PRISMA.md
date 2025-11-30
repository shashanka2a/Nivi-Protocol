# Prisma Setup & Middleware

This project uses Prisma ORM for database management and Next.js middleware for authentication.

## Database Setup

1. **Set up your database connection string:**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nivi_protocol?schema=public"
```

For production, use your database provider's connection string (e.g., Vercel Postgres, Supabase, Neon).

2. **Run migrations:**

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# Or push schema without migrations (for development)
npx prisma db push
```

3. **View your database (optional):**

```bash
npx prisma studio
```

## Middleware Features

The middleware (`src/middleware.ts`) provides:

- **Authentication checking** for protected routes
- **Session validation** using Prisma
- **Automatic redirects** to login for unauthenticated users
- **User context** added to request headers for API routes

### Protected Routes

- `/studio` - Creator Studio (requires authentication)
- `/dashboard` - User Dashboard (requires authentication)
- `/api/licenses/*` - License API endpoints
- `/api/videos/*` - Video API endpoints
- `/api/earnings/*` - Earnings API endpoints

### Public Routes

- `/` - Home/Marketplace (public)
- `/api/auth/*` - Authentication endpoints
- `/api/health` - Health check

## Authentication Flow

1. User connects wallet via Photon
2. Frontend calls `/api/auth/login` with wallet address
3. Backend finds or creates user in database
4. Session token is created and stored in cookie
5. Middleware validates session on protected routes

## API Endpoints

### POST `/api/auth/login`
Login with wallet address (Photon authentication)

**Request:**
```json
{
  "walletAddress": "0x...",
  "email": "user@example.com", // optional
  "name": "User Name" // optional
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "walletAddress": "0x...",
    "email": "user@example.com",
    "name": "User Name",
    "type": "CREATOR",
    "verified": false
  }
}
```

### POST `/api/auth/logout`
Logout and clear session

### GET `/api/auth/me`
Get current authenticated user

## Database Schema

The Prisma schema includes:

- **User** - Creators and Brands
- **Video** - Content with metadata
- **License** - Active subscriptions
- **Transaction** - Payment records
- **Withdrawal** - Earnings withdrawals
- **Session** - Authentication sessions

See `prisma/schema.prisma` for full schema details.

## Usage in Components

```typescript
import { getCurrentUser } from '@/lib/auth';

// In Server Components or API Routes
const user = await getCurrentUser();
if (!user) {
  // Not authenticated
}
```

## Next Steps

1. Set up your database (PostgreSQL)
2. Configure `DATABASE_URL` in `.env`
3. Run `npx prisma migrate dev` to create tables
4. Test authentication flow
5. Integrate with Photon wallet connection

