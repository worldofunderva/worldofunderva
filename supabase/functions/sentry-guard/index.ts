import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowedRaw = Deno.env.get("ALLOWED_ORIGINS") || "";
  const allowedOrigins = allowedRaw.split(",").map((s) => s.trim()).filter(Boolean);
  const isLovableOrigin = origin.endsWith(".lovableproject.com") || origin.endsWith(".lovable.app");
  const isAllowed = isLovableOrigin || allowedOrigins.includes(origin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
  const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const telegramChatId = Deno.env.get("TELEGRAM_CHAT_ID");

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: invalid token" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const userId = claimsData.claims.sub;

  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
  const { data: roles } = await serviceClient
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  const userRoles = (roles || []).map((r: { role: string }) => r.role);
  if (!userRoles.includes("operator") && !userRoles.includes("admin")) {
    return new Response(
      JSON.stringify({ error: "Forbidden: insufficient privileges" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const now = new Date().toISOString();
    const { data: activeWindows } = await supabase
      .from("sentry_deployment_windows")
      .select("*")
      .lte("starts_at", now)
      .gte("ends_at", now);

    const isDeploymentWindow = activeWindows && activeWindows.length > 0;

    const { data: status } = await supabase
      .from("sentry_status")
      .select("*, sentry_baselines(*)")
      .single();

    if (!status) {
      return new Response(
        JSON.stringify({ error: "No sentry status found" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Capture current state with real checks
    const currentSnapshot = await captureCurrentSnapshot(supabaseUrl, supabaseServiceKey);

    if (isDeploymentWindow) {
      const { data: newBaseline } = await supabase
        .from("sentry_baselines")
        .insert({
          snapshot: currentSnapshot,
          description: `Auto-captured during deployment window: ${activeWindows[0].label}`,
          deployment_window_id: activeWindows[0].id,
        })
        .select()
        .single();

      if (newBaseline) {
        await supabase
          .from("sentry_status")
          .update({
            last_baseline_id: newBaseline.id,
            last_check_at: now,
            updated_at: now,
          })
          .eq("id", status.id);
      }

      return new Response(
        JSON.stringify({
          status: "ok",
          message: "Deployment window active. Baseline updated.",
          window: activeWindows[0].label,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const baseline = status.sentry_baselines;
    if (!baseline) {
      const { data: initialBaseline } = await supabase
        .from("sentry_baselines")
        .insert({
          snapshot: currentSnapshot,
          description: "Initial baseline capture",
        })
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

      return new Response(
        JSON.stringify({ status: "ok", message: "Initial baseline captured." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Drift detection
    const drifts = detectDrift(baseline.snapshot, currentSnapshot);

    if (drifts.length === 0) {
      await supabase
        .from("sentry_status")
        .update({ last_check_at: now, updated_at: now })
        .eq("id", status.id);

      return new Response(
        JSON.stringify({ status: "ok", message: "No drift detected. System nominal." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // DRIFT DETECTED
    const driftDetails = drifts.join("; ");

    await supabase
      .from("sentry_status")
      .update({
        maintenance_mode: true,
        last_check_at: now,
        updated_at: now,
      })
      .eq("id", status.id);

    const alertRecord = {
      alert_type: "unauthorized_change",
      details: driftDetails,
      maintenance_mode_engaged: true,
      telegram_sent: false,
    };

    console.log("Telegram config check - Token:", telegramToken ? `set (${telegramToken.length} chars)` : "MISSING", "ChatId:", telegramChatId || "MISSING");

    if (telegramToken && telegramChatId) {
      const telegramMessage = [
        "🚨 <b>[SENTRY ALERT]</b>",
        "",
        `<b>Status:</b> Unauthorized Change Detected`,
        `<b>Details:</b> ${driftDetails.replace(/[<>&]/g, '')}`,
        `<b>Action:</b> Maintenance Mode Engaged`,
        "",
        `<i>Timestamp: ${now}</i>`,
        `<i>Agent: Sentry Guard v2.0</i>`,
      ].join("\n");

      try {
        console.log("Sending Telegram alert to chat:", telegramChatId);
        const tgUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
        console.log("Telegram URL:", tgUrl.replace(telegramToken, "***"));
        const tgResponse = await fetch(tgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        });
        const tgText = await tgResponse.text();
        console.log("Telegram raw response:", tgText);
        try {
          const tgResult = JSON.parse(tgText);
          if (tgResult.ok) {
            alertRecord.telegram_sent = true;
            console.log("Telegram alert sent successfully");
          } else {
            console.error("Telegram API error:", tgResult.description || tgText);
          }
        } catch {
          console.error("Failed to parse Telegram response:", tgText);
        }
      } catch (tgError) {
        console.error("Telegram fetch failed:", String(tgError));
      }
    } else {
      console.warn("Telegram not configured. Token present:", !!telegramToken, "ChatId present:", !!telegramChatId);
    }

    await supabase.from("sentry_alerts").insert(alertRecord);

    return new Response(
      JSON.stringify({
        status: "alert",
        message: "Unauthorized change detected. Maintenance mode engaged.",
        drifts,
        telegram_sent: alertRecord.telegram_sent,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sentry Guard error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// ─── Snapshot Capture ────────────────────────────────────────────────

async function captureCurrentSnapshot(supabaseUrl: string, serviceKey: string) {
  const snapshot: Record<string, unknown> = {
    captured_at: new Date().toISOString(),
    checks: {} as Record<string, unknown>,
  };
  const checks = snapshot.checks as Record<string, unknown>;

  // 1. Security headers from REAL production site(s)
  checks.security_headers = await checkSecurityHeaders();

  // 2. Real DB schema fingerprint
  checks.db_schema = await checkDatabaseSchema(supabaseUrl, serviceKey);

  // 3. Edge function health checks
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
        "content-security-policy",
        "x-frame-options",
        "x-xss-protection",
        "strict-transport-security",
        "permissions-policy",
        "x-content-type-options",
        "referrer-policy",
      ];
      response.headers.forEach((value, key) => {
        if (securityHeaderKeys.includes(key.toLowerCase())) {
          headers[key.toLowerCase()] = value;
        }
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
    // Get all public tables and their columns
    const { data: tables } = await client.rpc("get_schema_fingerprint" as never);
    if (tables) {
      schema.tables = tables;
    }
  } catch {
    // Fallback: query information_schema directly via REST
  }

  try {
    // Get table list with column counts as a lightweight fingerprint
    const { data: tableInfo, error } = await client
      .from("sentry_status")
      .select("id")
      .limit(0);
    
    // Use a simpler approach - query each known table to verify it exists
    const knownTables = [
      "profiles", "user_roles", "sentry_status", "sentry_alerts",
      "sentry_baselines", "sentry_deployment_windows"
    ];
    
    const tableChecks: Record<string, string> = {};
    for (const table of knownTables) {
      try {
        const { count, error: tErr } = await client
          .from(table)
          .select("*", { count: "exact", head: true });
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
    // Check RLS status for each table
    const { data: rlsData } = await client.rpc("check_rls_status" as never);
    if (rlsData) {
      schema.rls_status = rlsData;
    }
  } catch {
    schema.rls_status = "unavailable";
  }

  // Generate a hash of the schema for quick comparison
  schema.fingerprint = JSON.stringify(schema.table_checks || {});

  return schema;
}

async function checkEdgeFunctions(supabaseUrl: string, serviceKey: string): Promise<Record<string, unknown>> {
  const functions = ["sentry-guard", "sentry-admin"];
  const results: Record<string, unknown> = {};

  for (const fn of functions) {
    try {
      // Send OPTIONS request to check if function is deployed and responding
      const response = await fetch(`${supabaseUrl}/functions/v1/${fn}`, {
        method: "OPTIONS",
        headers: {
          "Authorization": `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
      });
      await response.text();
      results[fn] = {
        status: response.status,
        healthy: response.status === 200 || response.status === 204,
      };
    } catch {
      results[fn] = { status: "unreachable", healthy: false };
    }
  }

  return results;
}

// ─── Drift Detection ─────────────────────────────────────────────────

function detectDrift(
  baseline: Record<string, unknown>,
  current: Record<string, unknown>
): string[] {
  const drifts: string[] = [];
  const baseChecks = (baseline.checks || {}) as Record<string, unknown>;
  const currChecks = (current.checks || {}) as Record<string, unknown>;

  // 1. Security headers drift
  const baseHeaders = JSON.stringify(baseChecks.security_headers || {});
  const currHeaders = JSON.stringify(currChecks.security_headers || {});
  if (baseHeaders !== currHeaders) {
    drifts.push("Security headers modified on production site");
  }

  // 2. Database schema drift
  const baseSchema = (baseChecks.db_schema || {}) as Record<string, unknown>;
  const currSchema = (currChecks.db_schema || {}) as Record<string, unknown>;
  
  if (baseSchema.fingerprint && currSchema.fingerprint && baseSchema.fingerprint !== currSchema.fingerprint) {
    // Detailed comparison
    const baseTableChecks = (baseSchema.table_checks || {}) as Record<string, string>;
    const currTableChecks = (currSchema.table_checks || {}) as Record<string, string>;
    
    const allTables = new Set([...Object.keys(baseTableChecks), ...Object.keys(currTableChecks)]);
    for (const table of allTables) {
      if (!(table in baseTableChecks)) {
        drifts.push(`New table detected: ${table}`);
      } else if (!(table in currTableChecks)) {
        drifts.push(`Table removed: ${table}`);
      } else if (baseTableChecks[table].startsWith("exists") && currTableChecks[table] === "error") {
        drifts.push(`Table access changed: ${table}`);
      } else if (baseTableChecks[table] === "error" && currTableChecks[table] === "missing") {
        drifts.push(`Table disappeared: ${table}`);
      }
    }
    
    if (drifts.length === 0) {
      drifts.push("Database schema fingerprint changed");
    }
  }

  // 3. Edge function health drift
  const baseFns = (baseChecks.edge_functions || {}) as Record<string, Record<string, unknown>>;
  const currFns = (currChecks.edge_functions || {}) as Record<string, Record<string, unknown>>;
  
  for (const fn of Object.keys(currFns)) {
    const baseFn = baseFns[fn];
    const currFn = currFns[fn];
    if (baseFn?.healthy === true && currFn?.healthy === false) {
      drifts.push(`Edge function unhealthy: ${fn}`);
    }
    if (baseFn && currFn && baseFn.status !== currFn.status) {
      drifts.push(`Edge function status changed: ${fn} (${baseFn.status} → ${currFn.status})`);
    }
  }

  // 4. RLS status drift
  if (baseSchema.rls_status && currSchema.rls_status &&
      JSON.stringify(baseSchema.rls_status) !== JSON.stringify(currSchema.rls_status)) {
    drifts.push("Row Level Security policies modified");
  }

  return drifts;
}
