
-- Fix 1: Remove operator INSERT on sentry_baselines (must go through edge function, admin-only)
DROP POLICY IF EXISTS "Operators can insert baselines" ON public.sentry_baselines;

-- Fix 2: Tighten sentry_deployment_windows INSERT to admin-only
DROP POLICY IF EXISTS "Operators can insert windows" ON public.sentry_deployment_windows;
CREATE POLICY "Admins can insert windows"
  ON public.sentry_deployment_windows
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
