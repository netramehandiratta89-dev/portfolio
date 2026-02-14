import { isSupabaseConfigured } from '@/lib/supabase';

export const createClient = () => {
  // This is a placeholder for when Supabase is not configured or for when @supabase/ssr fails to install.
  // It's not a real Supabase client, but it prevents the app from crashing.
  const dummyClient = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ error: { message: 'Authentication is currently disabled due to installation issues.' } }),
      signOut: async () => {},
      exchangeCodeForSession: async () => ({ error: { message: 'Authentication is currently disabled.' } }),
    },
  };
  return dummyClient as any;
}
