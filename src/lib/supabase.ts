import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured =
  !!supabaseUrl &&
  !supabaseUrl.includes('YOUR_SUPABASE_URL') &&
  !!supabaseKey &&
  !supabaseKey.includes('YOUR_SUPABASE_SERVICE_ROLE_KEY');

if (!isSupabaseConfigured) {
    console.warn('Supabase credentials are not configured correctly in .env.local. The app will not be able to connect to the database. Please add your project URL and service role key, then restart the development server.');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;
