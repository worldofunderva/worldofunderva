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
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

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

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  const userRoles = (roles || []).map((r: { role: string }) => r.role);
  const isAdmin = userRoles.includes("admin");
  const isAuthorized = userRoles.includes("operator") || isAdmin;

  if (!isAuthorized) {
    return new Response(
      JSON.stringify({ error: "Forbidden: insufficient privileges" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const { action, data } = body;

    // ─── User Management ───────────────────────────────────────────

    if (action === "list_users") {
      const { data: { users }, error } = await supabase.auth.admin.listUsers({ perPage: 100 });
      if (error) throw error;

      const { data: allRoles } = await supabase.from("user_roles").select("user_id, role");
      const roleMap: Record<string, string[]> = {};
      (allRoles || []).forEach((r: { user_id: string; role: string }) => {
        if (!roleMap[r.user_id]) roleMap[r.user_id] = [];
        roleMap[r.user_id].push(r.role);
      });

      const members = users.map((u: any) => ({
        id: u.id,
        email: u.email,
        display_name: u.user_metadata?.display_name || u.user_metadata?.full_name || u.email?.split("@")[0],
        provider: u.app_metadata?.provider || "email",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        banned: !!u.banned_until && new Date(u.banned_until) > new Date(),
        roles: roleMap[u.id] || [],
      }));

      return new Response(JSON.stringify(members), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "ban_user") {
      const { user_id } = data;
      if (user_id === userId) {
        return new Response(JSON.stringify({ error: "Cannot ban yourself" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: targetRoles } = await supabase.from("user_roles").select("role").eq("user_id", user_id);
      const isTargetAdmin = (targetRoles || []).some((r: { role: string }) => r.role === "admin");
      if (isTargetAdmin && !isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can action admin accounts" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await supabase.auth.admin.updateUserById(user_id, { ban_duration: "876000h" });
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "unban_user") {
      const { user_id } = data;
      const { data: targetRoles } = await supabase.from("user_roles").select("role").eq("user_id", user_id);
      const isTargetAdmin = (targetRoles || []).some((r: { role: string }) => r.role === "admin");
      if (isTargetAdmin && !isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can unban admin accounts" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await supabase.auth.admin.updateUserById(user_id, { ban_duration: "none" });
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete_user") {
      const { user_id } = data;
      if (user_id === userId) {
        return new Response(JSON.stringify({ error: "Cannot delete yourself" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: targetRoles } = await supabase.from("user_roles").select("role").eq("user_id", user_id);
      const isTargetAdmin = (targetRoles || []).some((r: { role: string }) => r.role === "admin");
      if (isTargetAdmin && !isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can action admin accounts" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await supabase.auth.admin.deleteUser(user_id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "set_role") {
      const { user_id, role, grant } = data;
      if (!["admin", "operator"].includes(role)) {
        return new Response(JSON.stringify({ error: "Invalid role" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can manage roles" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (grant) {
        const { error } = await supabase
          .from("user_roles")
          .upsert({ user_id, role }, { onConflict: "user_id,role" });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", user_id)
          .eq("role", role);
        if (error) throw error;
      }
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── Create User ──────────────────────────────────────────────

    if (action === "create_user") {
      if (!isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can create users" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { email, password, display_name, roles: assignRoles } = data;

      // Validate inputs
      if (!email || typeof email !== "string" || !email.includes("@") || email.length > 255) {
        return new Response(JSON.stringify({ error: "Invalid email address" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!password || typeof password !== "string" || password.length < 8 || password.length > 128) {
        return new Response(JSON.stringify({ error: "Password must be 8-128 characters" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const trimmedName = (display_name || email.split("@")[0]).trim().slice(0, 100);

      // Create user via admin API (auto-confirms email)
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: email.trim().toLowerCase(),
        password,
        email_confirm: true,
        user_metadata: { display_name: trimmedName },
      });

      if (createError) {
        return new Response(JSON.stringify({ error: createError.message }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Assign roles if provided
      if (assignRoles && Array.isArray(assignRoles) && newUser.user) {
        for (const role of assignRoles) {
          if (["admin", "operator"].includes(role)) {
            await supabase
              .from("user_roles")
              .upsert({ user_id: newUser.user.id, role }, { onConflict: "user_id,role" });
          }
        }
      }

      return new Response(JSON.stringify({ success: true, user_id: newUser.user?.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── Deployment Windows ────────────────────────────────────────

    if (action === "create_window") {
      if (!isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can create deployment windows" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { label, starts_at, ends_at } = data;

      // Input validation
      if (!label || typeof label !== "string" || label.trim().length === 0 || label.length > 200) {
        return new Response(JSON.stringify({ error: "Invalid label: must be a non-empty string up to 200 characters" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const startDate = new Date(starts_at);
      const endDate = new Date(ends_at);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return new Response(JSON.stringify({ error: "Invalid timestamps: starts_at and ends_at must be valid dates" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (endDate <= startDate) {
        return new Response(JSON.stringify({ error: "Invalid window: ends_at must be after starts_at" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: result, error } = await supabase
        .from("sentry_deployment_windows")
        .insert({ label: label.trim(), starts_at, ends_at, created_by: claimsData.claims.email || "admin" })
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── Baseline Capture ──────────────────────────────────────────

    if (action === "capture_baseline") {
      if (!isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can capture baselines" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { description, deployment_window_id } = data;
      const snapshot = await captureServerSnapshot(supabaseUrl, supabaseServiceKey);
      const { data: baseline, error } = await supabase
        .from("sentry_baselines")
        .insert({ snapshot, description, deployment_window_id })
        .select()
        .single();
      if (error) throw error;

      await supabase
        .from("sentry_status")
        .update({
          last_baseline_id: baseline.id,
          updated_at: new Date().toISOString(),
        })
        .not("id", "is", null);

      return new Response(JSON.stringify(baseline), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── Maintenance Mode ──────────────────────────────────────────

    if (action === "disengage_maintenance") {
      if (!isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can disengage maintenance mode" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Mark all unresolved alerts as resolved
      await supabase
        .from("sentry_alerts")
        .update({
          resolved: true,
          resolved_at: new Date().toISOString(),
        })
        .eq("resolved", false);

      // Capture a fresh baseline so cron doesn't re-trigger on the same drift
      const freshSnapshot = await captureServerSnapshot(supabaseUrl, supabaseServiceKey);
      const { data: newBaseline } = await supabase
        .from("sentry_baselines")
        .insert({
          snapshot: freshSnapshot,
          description: "Auto-baseline after maintenance disengaged",
        })
        .select()
        .single();

      const now = new Date().toISOString();
      const statusUpdate: Record<string, unknown> = {
        maintenance_mode: false,
        updated_at: now,
        last_check_at: now,
      };
      if (newBaseline) {
        statusUpdate.last_baseline_id = newBaseline.id;
      }

      const { error } = await supabase
        .from("sentry_status")
        .update(statusUpdate)
        .not("id", "is", null);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, baseline_id: newBaseline?.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Unknown action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sentry admin error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// ─── Server Snapshot (must match sentry-cron format exactly) ─────────

async function captureServerSnapshot(supabaseUrl: string, serviceKey: string): Promise<Record<string, unknown>> {
  const snapshot: Record<string, unknown> = {
    captured_at: new Date().toISOString(),
    checks: {} as Record<string, unknown>,
  };
  const checks = snapshot.checks as Record<string, unknown>;

  // 1. Security headers
  const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map(s => s.trim()).filter(Boolean);
  const headerResults: Record<string, unknown> = {};
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
      headerResults[origin] = { status: response.status, headers };
    } catch {
      headerResults[origin] = { status: "unreachable", headers: {} };
    }
  }
  checks.security_headers = headerResults;

  // 2. DB schema fingerprint (matches sentry-cron's checkDatabaseSchema)
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
  checks.db_schema = schema;

  // 3. Edge function health (matches sentry-cron's list)
  const functions = ["sentry-guard", "sentry-admin", "sentry-cron"];
  const fnResults: Record<string, unknown> = {};
  for (const fn of functions) {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/${fn}`, {
        method: "OPTIONS",
        headers: { Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      });
      await response.text();
      fnResults[fn] = { status: response.status, healthy: response.status === 200 || response.status === 204 };
    } catch {
      fnResults[fn] = { status: "unreachable", healthy: false };
    }
  }
  checks.edge_functions = fnResults;

  return snapshot;
}
