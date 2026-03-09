-- Fix profiles table RLS policies: change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Fix user_roles table RLS policy
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Fix sentry_alerts table RLS policies
DROP POLICY IF EXISTS "Operators and admins can view alerts" ON public.sentry_alerts;
DROP POLICY IF EXISTS "Admins can insert alerts" ON public.sentry_alerts;

CREATE POLICY "Operators and admins can view alerts" ON public.sentry_alerts
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'operator'));

CREATE POLICY "Admins can insert alerts" ON public.sentry_alerts
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix sentry_baselines table RLS policies
DROP POLICY IF EXISTS "Operators and admins can view baselines" ON public.sentry_baselines;
DROP POLICY IF EXISTS "Admins can insert baselines" ON public.sentry_baselines;

CREATE POLICY "Operators and admins can view baselines" ON public.sentry_baselines
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'operator'));

CREATE POLICY "Admins can insert baselines" ON public.sentry_baselines
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix sentry_deployment_windows table RLS policies
DROP POLICY IF EXISTS "Operators and admins can view deployment windows" ON public.sentry_deployment_windows;
DROP POLICY IF EXISTS "Admins can insert deployment windows" ON public.sentry_deployment_windows;

CREATE POLICY "Operators and admins can view deployment windows" ON public.sentry_deployment_windows
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'operator'));

CREATE POLICY "Admins can insert deployment windows" ON public.sentry_deployment_windows
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix sentry_status table RLS policies
DROP POLICY IF EXISTS "Operators and admins can view status" ON public.sentry_status;
DROP POLICY IF EXISTS "Admins can insert status" ON public.sentry_status;

CREATE POLICY "Operators and admins can view status" ON public.sentry_status
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'operator'));

CREATE POLICY "Admins can insert status" ON public.sentry_status
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));