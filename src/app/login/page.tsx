'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Login Disabled</CardTitle>
          <CardDescription>The login functionality is temporarily unavailable.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">We are working on resolving an issue and will restore this feature shortly.</p>
        </CardContent>
      </Card>
    </div>
  );
}
