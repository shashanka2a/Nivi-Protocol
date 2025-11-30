import { supabase } from './client';

export interface SignUpData {
  email?: string;
  password?: string;
  walletAddress?: string;
  name?: string;
  avatar?: string;
  type?: 'CREATOR' | 'BRAND';
}

export interface User {
  id: string;
  email: string | null;
  wallet_address: string | null;
  name: string | null;
  avatar: string | null;
  type: 'CREATOR' | 'BRAND';
  verified: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData) {
  let authUser = null;

  // If email/password provided, create auth user
  if (data.email && data.password) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      return { data: null, error: authError };
    }

    authUser = authData.user;
  }

  // Create user profile
  const userId = authUser?.id || crypto.randomUUID();

  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      id: userId,
      email: data.email || null,
      wallet_address: data.walletAddress || null,
      name: data.name || null,
      avatar: data.avatar || null,
      type: data.type || 'CREATOR',
      verified: false,
    })
    .select()
    .single();

  if (userError) {
    return { data: null, error: userError };
  }

  return { data: userData as User, error: null };
}

/**
 * Sign in with email/password
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { data: null, error };
  }

  // Get user profile
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (userError) {
    return { data: null, error: userError };
  }

  return { data: { ...data, user: user as User }, error: null };
}

/**
 * Sign in with wallet (Photon authentication)
 */
export async function signInWithWallet(walletAddress: string, name?: string, email?: string) {
  // Find or create user by wallet address
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (existingUser) {
    // Create session token for wallet-based auth
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .insert({
        user_id: existingUser.id,
        token,
        wallet_address: walletAddress,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (sessionError) {
      return { data: null, error: sessionError };
    }

    return { data: { user: existingUser as User, session }, error: null };
  }

  // Create new user
  return signUp({
    walletAddress,
    name,
    email,
    type: 'CREATOR',
  });
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    return null;
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();

  if (error || !user) {
    return null;
  }

  return user as User;
}

/**
 * Get user by wallet address
 */
export async function getUserByWallet(walletAddress: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (error || !data) {
    return null;
  }

  return data as User;
}

