
-- Sentry Guard: Deployment Windows
CREATE TABLE public.sentry_deployment_windows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  created_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sentry Guard: Baselines (snapshot of authorized state)
CREATE TABLE public.sentry_baselines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot JSONB NOT NULL,
  description TEXT,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deployment_window_id UUID REFERENCES public.sentry_deployment_windows(id)
);

-- Sentry Guard: Alert Log
CREATE TABLE public.sentry_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL DEFAULT 'unauthorized_change',
  details TEXT NOT NULL,
  maintenance_mode_engaged BOOLEAN NOT NULL DEFAULT true,
  telegram_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sentry Guard: System Status
CREATE TABLE public.sentry_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  last_check_at TIMESTAMPTZ,
  last_baseline_id UUID REFERENCES public.sentry_baselines(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert initial status row
INSERT INTO public.sentry_status (maintenance_mode) VALUES (false);

-- Enable RLS on all tables
ALTER TABLE public.sentry_deployment_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentry_baselines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentry_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentry_status ENABLE ROW LEVEL SECURITY;

-- RLS: Allow service role full access (edge functions use service role)
-- For anon/authenticated: read-only on status and alerts
CREATE POLICY "Allow read status" ON public.sentry_status FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow read alerts" ON public.sentry_alerts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow read windows" ON public.sentry_deployment_windows FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow read baselines" ON public.sentry_baselines FOR SELECT TO anon, authenticated USING (true);

-- Service role bypasses RLS, so edge functions can write freely
