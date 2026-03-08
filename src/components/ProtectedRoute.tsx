import { useEffect, useState, useRef, ReactNode, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ProtectedContext {
  user: User;
  isAdmin: boolean;
  isOperator: boolean;
}

const ProtectedCtx = createContext<ProtectedContext | null>(null);

/** Access the authenticated user + resolved roles from within a ProtectedRoute. */
export function useProtectedContext() {
  const ctx = useContext(ProtectedCtx);
  if (!ctx) throw new Error('useProtectedContext must be used inside ProtectedRoute');
  return ctx;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const [state, setState] = useState<{
    user: User | null;
    isAdmin: boolean;
    isOperator: boolean;
    loading: boolean;
  }>({ user: null, isAdmin: false, isOperator: false, loading: true });

  const checking = useRef(false);

  useEffect(() => {
    const resolve = async (user: User | null) => {
      if (!user) {
        setState({ user: null, isAdmin: false, isOperator: false, loading: false });
        return;
      }
      // Avoid duplicate concurrent checks
      if (checking.current) return;
      checking.current = true;

      const [adminRes, operatorRes] = await Promise.all([
        supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' }),
        supabase.rpc('has_role', { _user_id: user.id, _role: 'operator' }),
      ]);

      setState({
        user,
        isAdmin: adminRes.data === true,
        isOperator: operatorRes.data === true,
        loading: false,
      });
      checking.current = false;
    };

    // Get session first (faster path)
    supabase.auth.getSession().then(({ data: { session } }) => {
      resolve(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Only re-resolve if state actually changed
      const newUser = session?.user ?? null;
      if (newUser?.id !== state.user?.id) {
        resolve(newUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!state.user || (!state.isAdmin && !state.isOperator)) {
    return <>{fallback}</>;
  }

  return (
    <ProtectedCtx.Provider value={{ user: state.user, isAdmin: state.isAdmin, isOperator: state.isOperator }}>
      {children}
    </ProtectedCtx.Provider>
  );
}
