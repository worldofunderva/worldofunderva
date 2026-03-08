import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Shield, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const signupSchema = z.object({
  displayName: z.string().trim().min(2, 'Display name must be at least 2 characters').max(50, 'Display name is too long'),
  email: z.string().trim().email('Enter a valid email address').max(255, 'Email is too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(255, 'Email is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function getFriendlyAuthError(error: unknown, mode: 'login' | 'signup') {
  const message = error instanceof Error ? error.message : 'Unknown error';
  const lower = message.toLowerCase();

  if (lower.includes('load failed') || lower.includes('failed to fetch') || lower.includes('network')) {
    return 'Connection failed. Please open the app from your Lovable preview/published URL and try again.';
  }

  if (mode === 'login') {
    return lower.includes('email not confirmed')
      ? 'Please verify your email first, then sign in.'
      : 'Invalid email/password. If you are new, click Create account first.';
  }

  return message;
}

export default function SentryAuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
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
        toast({ title: 'Login Failed', description: getFriendlyAuthError(error, 'login'), variant: 'destructive' });
      } else {
        toast({ title: 'Signed in successfully' });
        navigate('/sentry-guard');
      }
    } catch (error) {
      toast({ title: 'Login Failed', description: getFriendlyAuthError(error, 'login'), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const parsed = signupSchema.safeParse({ displayName, email, password });
    if (!parsed.success) {
      toast({ title: 'Invalid Input', description: parsed.error.issues[0]?.message, variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: { display_name: parsed.data.displayName.trim() },
          emailRedirectTo: window.location.origin + '/sentry-guard',
        },
      });

      if (error) {
        toast({ title: 'Signup Failed', description: getFriendlyAuthError(error, 'signup'), variant: 'destructive' });
      } else if (data.session) {
        toast({ title: 'Account Created', description: 'You are now signed in.' });
        navigate('/sentry-guard');
      } else {
        toast({
          title: 'Verification Email Sent',
          description: 'Check your inbox, verify your email, then sign in.',
        });
        setMode('login');
      }
    } catch (error) {
      toast({ title: 'Signup Failed', description: getFriendlyAuthError(error, 'signup'), variant: 'destructive' });
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
          <p className="text-sm text-muted-foreground">Use your real email to sign in or create an account</p>
        </div>

        <Card className="p-6 border-primary/20">
          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <Label className="text-xs">Display Name</Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  required
                  maxLength={50}
                  className="mt-1"
                />
              </div>
            )}
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
                minLength={mode === 'signup' ? 8 : 6}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                'Processing...'
              ) : mode === 'login' ? (
                <><LogIn className="h-4 w-4 mr-2" /> Sign In</>
              ) : (
                <><UserPlus className="h-4 w-4 mr-2" /> Create Account</>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? 'New here? Create account' : 'Already have an account? Sign in'}
            </button>
          </div>
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

