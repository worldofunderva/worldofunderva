
-- Fix: Recreate all RLS policies as PERMISSIVE (default) instead of RESTRICTIVE

-- profiles
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- user_roles
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- sentry_status
DROP POLICY IF EXISTS "Operators can read status" ON public.sentry_status;
CREATE POLICY "Operators can read status" ON public.sentry_status
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'operator'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- sentry_alerts
DROP POLICY IF EXISTS "Operators can read alerts" ON public.sentry_alerts;
CREATE POLICY "Operators can read alerts" ON public.sentry_alerts
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'operator'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- sentry_baselines
DROP POLICY IF EXISTS "Operators can read baselines" ON public.sentry_baselines;
CREATE POLICY "Operators can read baselines" ON public.sentry_baselines
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'operator'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- sentry_deployment_windows
DROP POLICY IF EXISTS "Operators can read windows" ON public.sentry_deployment_windows;
CREATE POLICY "Operators can read windows" ON public.sentry_deployment_windows
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'operator'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can insert windows" ON public.sentry_deployment_windows;
CREATE POLICY "Admins can insert windows" ON public.sentry_deployment_windows
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
