import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dgsvwqjtwqqpvmhjwtku.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnc3Z3cWp0d3FxcHZtaGp3dGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjkzMTEsImV4cCI6MjA4ODU0NTMxMX0.SHsEFkxaO5lj3L324P8n6hJGT69ry_T__a9gsx_d8JM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
