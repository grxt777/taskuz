import { supabase } from './supabase';
import type { Profile } from './auth';

export async function fetchProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return data as Profile;
}

export async function updateProfileSettings(
  id: string,
  patch: Partial<
    Pick<Profile, 'name' | 'email' | 'default_address' | 'notify_push' | 'notify_email' | 'notify_sms'>
  >
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error || !data) {
    console.error(error);
    return null;
  }
  return data as Profile;
}
