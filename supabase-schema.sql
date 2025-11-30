-- Nivi Protocol Supabase Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE,
  wallet_address TEXT UNIQUE,
  name TEXT,
  avatar TEXT,
  type TEXT NOT NULL DEFAULT 'CREATOR' CHECK (type IN ('CREATOR', 'BRAND')),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(type);

-- ============================================
-- VIDEOS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  video_url TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  verified BOOLEAN DEFAULT false,
  shelby_score DECIMAL(5, 2),
  creator_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_videos_creator_id ON videos(creator_id);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_verified ON videos(verified);

-- ============================================
-- VIDEO STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS video_stats (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  video_id TEXT UNIQUE NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  licenses INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LICENSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS licenses (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  video_id TEXT NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  subscriber_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PENDING')),
  monthly_fee DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  next_billing TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_licenses_subscriber_id ON licenses(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_licenses_owner_id ON licenses(owner_id);
CREATE INDEX IF NOT EXISTS idx_licenses_video_id ON licenses(video_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);

-- ============================================
-- TRANSACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  license_id TEXT REFERENCES licenses(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('SUBSCRIPTION', 'WITHDRAWAL', 'MINT_FEE', 'REFUND')),
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) DEFAULT 0,
  aptos_tx_hash TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_license_id ON transactions(license_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_aptos_tx_hash ON transactions(aptos_tx_hash);

-- ============================================
-- WITHDRAWALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS withdrawals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  aptos_tx_hash TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status);

-- ============================================
-- SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  wallet_address TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Users: Can read own profile, creators can read public profiles
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can read public creator profiles" ON users
  FOR SELECT USING (type = 'CREATOR' AND verified = true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Videos: Public read, creators can manage own videos
CREATE POLICY "Anyone can read verified videos" ON videos
  FOR SELECT USING (verified = true);

CREATE POLICY "Creators can manage own videos" ON videos
  FOR ALL USING (creator_id = auth.uid()::text);

-- Video Stats: Public read
CREATE POLICY "Anyone can read video stats" ON video_stats
  FOR SELECT USING (true);

-- Licenses: Users can read own licenses
CREATE POLICY "Users can read own licenses" ON licenses
  FOR SELECT USING (
    subscriber_id = auth.uid()::text OR 
    owner_id = auth.uid()::text
  );

CREATE POLICY "Users can create licenses" ON licenses
  FOR INSERT WITH CHECK (subscriber_id = auth.uid()::text);

-- Transactions: Users can read own transactions
CREATE POLICY "Users can read own transactions" ON transactions
  FOR SELECT USING (user_id = auth.uid()::text);

-- Withdrawals: Users can read own withdrawals
CREATE POLICY "Users can read own withdrawals" ON withdrawals
  FOR SELECT USING (user_id = auth.uid()::text);

-- Sessions: Users can manage own sessions
CREATE POLICY "Users can manage own sessions" ON sessions
  FOR ALL USING (user_id = auth.uid()::text);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_licenses_updated_at BEFORE UPDATE ON licenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_withdrawals_updated_at BEFORE UPDATE ON withdrawals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample creator user
INSERT INTO users (id, email, name, type, verified, wallet_address)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'creator@nivi.test',
  'Test Creator',
  'CREATOR',
  true,
  '0x1234567890123456789012345678901234567890'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample brand user
INSERT INTO users (id, email, name, type, verified, wallet_address)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'brand@nivi.test',
  'Test Brand',
  'BRAND',
  true,
  '0x0987654321098765432109876543210987654321'
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Nivi Protocol schema created successfully!';
  RAISE NOTICE '📊 Tables created: users, videos, video_stats, licenses, transactions, withdrawals, sessions';
  RAISE NOTICE '🔐 Row Level Security enabled on all tables';
  RAISE NOTICE '🔄 Auto-update triggers configured';
END $$;

