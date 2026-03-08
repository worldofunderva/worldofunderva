import { useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [hasRole, setHasRole] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async (userId: string) => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .in('role', ['admin', 'operator']);

      setHasRole(!!(data && data.length > 0));
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await checkRole(currentUser.id);
      } else {
        setHasRole(false);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await checkRole(currentUser.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !hasRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
