import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Shield, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function SentryAuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back, Operator' });
    }
    setLoading(false);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin + '/sentry-guard',
      },
    });
    if (error) {
      toast({ title: 'Signup Failed', description: error.message, variant: 'destructive' });
    } else {
      toast({
        title: 'Verification Email Sent',
        description: 'Check your inbox and verify your email before signing in.',
      });
      setMode('login');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Shield className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground">Sentry Guard</h1>
          <p className="text-sm text-muted-foreground">Authorized Operators Only</p>
        </div>

        <Card className="p-6 border-primary/20">
          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <Label className="text-xs">Display Name</Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Operator callsign"
                  required
                  className="mt-1"
                />
              </div>
            )}
            <div>
              <Label className="text-xs">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@underva.io"
                required
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
                minLength={8}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                'Processing...'
              ) : mode === 'login' ? (
                <><LogIn className="h-4 w-4 mr-2" /> Sign In</>
              ) : (
                <><UserPlus className="h-4 w-4 mr-2" /> Request Access</>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? 'Need access? Request operator credentials' : 'Already have access? Sign in'}
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
