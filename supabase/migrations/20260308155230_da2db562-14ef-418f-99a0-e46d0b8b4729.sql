ALTER TABLE public.sentry_alerts ADD COLUMN resolved boolean NOT NULL DEFAULT false;
ALTER TABLE public.sentry_alerts ADD COLUMN resolved_at timestamp with time zone;