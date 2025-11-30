import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xnzruzquuvovtucbqdrw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

if (!supabaseKey) {
  throw new Error('Missing Supabase keys. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_KEY in your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side Supabase client (for API routes and server components)
export function createServerClient() {
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;
  return createClient(supabaseUrl, serverKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

