import { isSupabaseConfigured } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <Alert className="max-w-xl">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Supabase not configured</AlertTitle>
          <AlertDescription>
            Please configure your Supabase credentials in the environment variables to use the Admin Panel.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  );
}
