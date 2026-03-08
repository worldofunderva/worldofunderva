import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Sentry Cron — automated scanning triggered by pg_cron.
 * Authenticates via SENTRY_CRON_SECRET header (server-to-server).
 * Runs a single scan pass per invocation. Scheduled every minute via two
 * offset cron jobs for ~30-second effective scan intervals.
 */

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ─── Authenticate via shared secret ────────────────────────────
  const cronSecret = Deno.env.get("SENTRY_CRON_SECRET");
  const providedSecret = req.headers.get("x-sentry-cron-secret");
  if (!cronSecret || providedSecret !== cronSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const result = await runScan(supabaseUrl, supabaseServiceKey);

  return new Response(
    JSON.stringify(result),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});

// ─── Core Scan Logic (mirrors sentry-guard) ──────────────────────────

async function runScan(
  supabaseUrl: string,
  serviceKey: string
): Promise<Record<string, unknown>> {
  const supabase = createClient(supabaseUrl, serviceKey);
  const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const telegramChatId = Deno.env.get("TELEGRAM_CHAT_ID");

  try {
    const now = new Date().toISOString();

    // Check for active deployment windows — skip entirely if one is active
    const { data: activeWindows } = await supabase
      .from("sentry_deployment_windows")
      .select("*")
      .lte("starts_at", now)
      .gte("ends_at", now);

    if (activeWindows && activeWindows.length > 0) {
      return { status: "paused", message: `Deployment window "${activeWindows[0].label}" active. Scanning paused.` };
    }

    // Get current status + baseline
    const { data: status } = await supabase
      .from("sentry_status")
      .select("*, sentry_baselines(*)")
      .single();

    if (!status) {
      return { status: "error", message: "No sentry status row found" };
    }

    // Already in maintenance? Skip scan to avoid duplicate alerts.
    if (status.maintenance_mode) {
      return { status: "skipped", message: "Already in maintenance mode" };
    }

    // Capture current snapshot
    const currentSnapshot = await captureCurrentSnapshot(supabaseUrl, serviceKey);

    const baseline = status.sentry_baselines;
    if (!baseline) {
      // No baseline yet — capture initial
      const { data: initialBaseline } = await supabase
        .from("sentry_baselines")
        .insert({ snapshot: currentSnapshot, description: "Initial baseline capture (cron)" })
        .select()
        .single();

      if (initialBaseline) {
        await supabase
          .from("sentry_status")
          .update({
            last_baseline_id: initialBaseline.id,
            last_check_at: now,
            updated_at: now,
          })
          .eq("id", status.id);
      }
      return { status: "ok", message: "Initial baseline captured." };
    }

    // ─── Drift detection ──────────────────────────────────────────
    const drifts = detectDrift(baseline.snapshot, currentSnapshot);

    if (drifts.length === 0) {
      await supabase
        .from("sentry_status")
        .update({ last_check_at: now, updated_at: now })
        .eq("id", status.id);
      return { status: "ok", message: "No drift detected." };
    }

    // DRIFT DETECTED — engage maintenance mode
    const driftDetails = drifts.join("; ");

    await supabase
      .from("sentry_status")
      .update({ maintenance_mode: true, last_check_at: now, updated_at: now })
      .eq("id", status.id);

    const alertRecord = {
      alert_type: "unauthorized_change",
      details: driftDetails,
      maintenance_mode_engaged: true,
      telegram_sent: false,
    };

    // Telegram notification
    if (telegramToken && telegramChatId) {
      const telegramMessage = [
        "🚨 <b>[SENTRY ALERT — AUTO SCAN]</b>",
        "",
        `<b>Status:</b> Unauthorized Change Detected`,
        `<b>Details:</b> ${driftDetails.replace(/[<>&]/g, "")}`,
        `<b>Action:</b> Maintenance Mode Engaged`,
        "",
        `<i>Timestamp: ${now}</i>`,
        `<i>Agent: Sentry Cron v1.0</i>`,
      ].join("\n");

      try {
        const tgResponse = await fetch(
          `https://api.telegram.org/bot${telegramToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: telegramChatId, text: telegramMessage, parse_mode: "HTML" }),
          }
        );
        const tgResult = await tgResponse.json();
        if (tgResult.ok) alertRecord.telegram_sent = true;
      } catch (tgError) {
        console.error("Telegram send failed:", String(tgError));
      }
    }

    await supabase.from("sentry_alerts").insert(alertRecord);

    return { status: "alert", message: "Drift detected. Maintenance mode engaged.", drifts, telegram_sent: alertRecord.telegram_sent };
  } catch (error) {
    console.error("Sentry cron scan error:", error);
    return { status: "error", message: "Scan failed" };
  }
}

// ─── Snapshot Capture (same as sentry-guard) ─────────────────────────

async function captureCurrentSnapshot(supabaseUrl: string, serviceKey: string) {
  const snapshot: Record<string, unknown> = {
    captured_at: new Date().toISOString(),
    checks: {} as Record<string, unknown>,
  };
  const checks = snapshot.checks as Record<string, unknown>;

  checks.security_headers = await checkSecurityHeaders();
  checks.db_schema = await checkDatabaseSchema(supabaseUrl, serviceKey);
  checks.edge_functions = await checkEdgeFunctions(supabaseUrl, serviceKey);

  return snapshot;
}

async function checkSecurityHeaders(): Promise<Record<string, unknown>> {
  const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map(s => s.trim()).filter(Boolean);
  const results: Record<string, unknown> = {};

  for (const origin of allowedOrigins) {
    try {
      const response = await fetch(origin, { method: "HEAD" });
      const headers: Record<string, string> = {};
      const securityHeaderKeys = [
        "content-security-policy", "x-frame-options", "x-xss-protection",
        "strict-transport-security", "permissions-policy", "x-content-type-options", "referrer-policy",
      ];
      response.headers.forEach((value, key) => {
        if (securityHeaderKeys.includes(key.toLowerCase())) headers[key.toLowerCase()] = value;
      });
      await response.text();
      results[origin] = { status: response.status, headers };
    } catch {
      results[origin] = { status: "unreachable", headers: {} };
    }
  }
  return results;
}

async function checkDatabaseSchema(supabaseUrl: string, serviceKey: string): Promise<Record<string, unknown>> {
  const client = createClient(supabaseUrl, serviceKey);
  const schema: Record<string, unknown> = {};

  try {
    const { data: tables } = await client.rpc("get_schema_fingerprint" as never);
    if (tables) schema.tables = tables;
  } catch {}

  try {
    const knownTables = [
      "profiles", "user_roles", "sentry_status", "sentry_alerts",
      "sentry_baselines", "sentry_deployment_windows",
    ];
    const tableChecks: Record<string, string> = {};
    for (const table of knownTables) {
      try {
        const { error: tErr } = await client.from(table).select("*", { count: "exact", head: true });
        tableChecks[table] = tErr ? "error" : "exists";
      } catch {
        tableChecks[table] = "missing";
      }
    }
    schema.table_checks = tableChecks;
  } catch {
    schema.table_checks = "error";
  }

  try {
    const { data: rlsData } = await client.rpc("check_rls_status" as never);
    if (rlsData) schema.rls_status = rlsData;
  } catch {
    schema.rls_status = "unavailable";
  }

  schema.fingerprint = JSON.stringify(schema.table_checks || {});
  return schema;
}

async function checkEdgeFunctions(supabaseUrl: string, serviceKey: string): Promise<Record<string, unknown>> {
  const functions = ["sentry-guard", "sentry-admin", "sentry-cron"];
  const results: Record<string, unknown> = {};

  for (const fn of functions) {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/${fn}`, {
        method: "OPTIONS",
        headers: { Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      });
      await response.text();
      results[fn] = { status: response.status, healthy: response.status === 200 || response.status === 204 };
    } catch {
      results[fn] = { status: "unreachable", healthy: false };
    }
  }
  return results;
}

// ─── Drift Detection (same as sentry-guard) ──────────────────────────

function detectDrift(baseline: Record<string, unknown>, current: Record<string, unknown>): string[] {
  const drifts: string[] = [];
  const baseChecks = (baseline.checks || {}) as Record<string, unknown>;
  const currChecks = (current.checks || {}) as Record<string, unknown>;

  // Security headers
  if (JSON.stringify(baseChecks.security_headers || {}) !== JSON.stringify(currChecks.security_headers || {})) {
    drifts.push("Security headers modified on production site");
  }

  // DB schema
  const baseSchema = (baseChecks.db_schema || {}) as Record<string, unknown>;
  const currSchema = (currChecks.db_schema || {}) as Record<string, unknown>;

  if (baseSchema.fingerprint && currSchema.fingerprint && baseSchema.fingerprint !== currSchema.fingerprint) {
    const baseTableChecks = (baseSchema.table_checks || {}) as Record<string, string>;
    const currTableChecks = (currSchema.table_checks || {}) as Record<string, string>;
    const allTables = new Set([...Object.keys(baseTableChecks), ...Object.keys(currTableChecks)]);

    for (const table of allTables) {
      if (!(table in baseTableChecks)) drifts.push(`New table detected: ${table}`);
      else if (!(table in currTableChecks)) drifts.push(`Table removed: ${table}`);
      else if (baseTableChecks[table].startsWith("exists") && currTableChecks[table] === "error") drifts.push(`Table access changed: ${table}`);
      else if (baseTableChecks[table] === "error" && currTableChecks[table] === "missing") drifts.push(`Table disappeared: ${table}`);
    }
    if (drifts.length === 0) drifts.push("Database schema fingerprint changed");
  }

  // Edge functions
  const baseFns = (baseChecks.edge_functions || {}) as Record<string, Record<string, unknown>>;
  const currFns = (currChecks.edge_functions || {}) as Record<string, Record<string, unknown>>;
  for (const fn of Object.keys(currFns)) {
    const baseFn = baseFns[fn];
    const currFn = currFns[fn];
    if (baseFn?.healthy === true && currFn?.healthy === false) drifts.push(`Edge function unhealthy: ${fn}`);
    if (baseFn && currFn && baseFn.status !== currFn.status) drifts.push(`Edge function status changed: ${fn} (${baseFn.status} → ${currFn.status})`);
  }

  // RLS
  if (baseSchema.rls_status && currSchema.rls_status && JSON.stringify(baseSchema.rls_status) !== JSON.stringify(currSchema.rls_status)) {
    drifts.push("Row Level Security policies modified");
  }

  return drifts;
}
