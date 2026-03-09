-- Remove duplicate old RESTRICTIVE policies that were left behind
DROP POLICY IF EXISTS "Operators can read alerts" ON public.sentry_alerts;
DROP POLICY IF EXISTS "Operators can read baselines" ON public.sentry_baselines;
DROP POLICY IF EXISTS "Admins can insert windows" ON public.sentry_deployment_windows;
DROP POLICY IF EXISTS "Operators can read windows" ON public.sentry_deployment_windows;
DROP POLICY IF EXISTS "Operators can read status" ON public.sentry_status;