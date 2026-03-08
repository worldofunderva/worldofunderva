import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const { error } = await lovable.auth.signInWithOAuth('google', {
                  redirect_uri: window.location.origin + '/sentry-guard',
                });
                if (error) {
                  toast({ title: 'Google Sign-In Failed', description: String(error), variant: 'destructive' });
                }
              } catch (err) {
                toast({ title: 'Google Sign-In Failed', description: getFriendlyAuthError(err, 'login'), variant: 'destructive' });
              } finally {
                setLoading(false);
              }
            }}
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </Button>

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

