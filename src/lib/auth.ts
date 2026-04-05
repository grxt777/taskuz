const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_URL?.replace('.supabase.co', '.supabase.co') 
  || 'https://dgsvwqjtwqqpvmhjwtku.supabase.co';
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY 
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnc3Z3cWp0d3FxcHZtaGp3dGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjkzMTEsImV4cCI6MjA4ODU0NTMxMX0.SHsEFkxaO5lj3L324P8n6hJGT69ry_T__a9gsx_d8JM';

async function invokeFunction<T>(name: string, body: object): Promise<T> {
  const res = await fetch(`${FUNCTIONS_URL}/functions/v1/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function sendOTP(phone: string): Promise<{ success: boolean }> {
  return invokeFunction('send-otp', { phone });
}

export async function verifyOTP(params: {
  phone: string;
  code: string;
  name?: string;
  email?: string;
  role?: 'client' | 'tasker';
}): Promise<{ success: boolean; profile?: Profile; needRegistration?: boolean }> {
  return invokeFunction('verify-otp', params);
}

export interface Profile {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  role: 'client' | 'tasker' | 'admin';
  created_at: string;
  updated_at: string;
  default_address?: string | null;
  notify_push?: boolean;
  notify_email?: boolean;
  notify_sms?: boolean;
}

const STORAGE_KEY = 'taskuz_profile';

export function saveProfile(profile: Profile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function loadProfile(): Profile | null {
  const s = localStorage.getItem(STORAGE_KEY);
  if (!s) return null;
  try {
    return JSON.parse(s) as Profile;
  } catch {
    return null;
  }
}

export function clearProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}
