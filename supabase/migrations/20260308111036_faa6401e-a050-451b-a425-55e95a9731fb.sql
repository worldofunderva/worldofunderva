
-- Fix 1: Remove public read policy on sentry_alerts and restrict to operators/admins
DROP POLICY IF EXISTS "Allow read alerts" ON public.sentry_alerts;

CREATE POLICY "Operators can read alerts" ON public.sentry_alerts
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'operator') OR public.has_role(auth.uid(), 'admin'));

-- Also restrict sentry_status and sentry_deployment_windows reads to authenticated operators
DROP POLICY IF EXISTS "Allow read status" ON public.sentry_status;
DROP POLICY IF EXISTS "Allow read windows" ON public.sentry_deployment_windows;
DROP POLICY IF EXISTS "Allow read baselines" ON public.sentry_baselines;

CREATE POLICY "Operators can read status" ON public.sentry_status
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'operator') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Operators can read windows" ON public.sentry_deployment_windows
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'operator') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Operators can read baselines" ON public.sentry_baselines
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'operator') OR public.has_role(auth.uid(), 'admin'));
