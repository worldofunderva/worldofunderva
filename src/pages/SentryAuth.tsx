import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Shield, LogIn, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(255, 'Email is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function getFriendlyAuthError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  const lower = message.toLowerCase();

  if (lower.includes('load failed') || lower.includes('failed to fetch') || lower.includes('network')) {
    return 'Connection failed. Please open the app from your Lovable preview/published URL and try again.';
  }

  return lower.includes('email not confirmed')
    ? 'Please verify your email first, then sign in.'
    : 'Invalid email or password.';
}

export default function SentryAuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: 'Invalid Input', description: parsed.error.issues[0]?.message, variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      if (error) {
        toast({ title: 'Login Failed', description: getFriendlyAuthError(error), variant: 'destructive' });
      } else {
        toast({ title: 'Signed in successfully' });
        navigate('/sentry-guard');
      }
    } catch (error) {
      toast({ title: 'Login Failed', description: getFriendlyAuthError(error), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Shield className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground">Sentry Guard Access</h1>
          <p className="text-sm text-muted-foreground">Authorized personnel only. Sign in with your credentials.</p>
        </div>

        <Card className="p-6 border-primary/20">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="text-xs">Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourdomain.com"
                required
                maxLength={255}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : <><LogIn className="h-4 w-4 mr-2" /> Sign In</>}
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Main Site
          </button>
        </div>
      </div>
    </div>
  );
}
