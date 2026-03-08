-- Profiles table (extends auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'tasker', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- OTP verifications (for DevSMS flow)
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast OTP lookup
CREATE INDEX IF NOT EXISTS idx_otp_phone_expires ON otp_verifications(phone, expires_at);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous to insert/select OTP (for Edge Function use)
CREATE POLICY "Allow anonymous OTP insert" ON public.otp_verifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous OTP select" ON public.otp_verifications
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous OTP delete" ON public.otp_verifications
  FOR DELETE USING (true);

-- Profiles: allow all for now (Edge Function uses service role)
CREATE POLICY "Allow all profiles" ON public.profiles
  FOR ALL USING (true) WITH CHECK (true);
