import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowedRaw = Deno.env.get("ALLOWED_ORIGINS") || "";
  const allowedOrigins = allowedRaw.split(",").map((s) => s.trim()).filter(Boolean);
  const isAllowed = allowedOrigins.includes(origin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0] || "",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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
  const supabaseAnonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

  // Authenticate the caller
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Verify JWT and extract user identity
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

  // Verify operator or admin role using service role client
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

    if (action === "list_users") {
      const { data: { users }, error } = await supabase.auth.admin.listUsers({ perPage: 100 });
      if (error) throw error;

      // Enrich with roles
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
      // Prevent operators from banning admins
      const { data: targetRoles } = await supabase.from("user_roles").select("role").eq("user_id", user_id);
      const isTargetAdmin = (targetRoles || []).some((r: { role: string }) => r.role === "admin");
      if (isTargetAdmin && !isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can action admin accounts" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await supabase.auth.admin.updateUserById(user_id, {
        ban_duration: "876000h",
      });
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "unban_user") {
      const { user_id } = data;
      // Prevent operators from unbanning admins
      const { data: targetRoles } = await supabase.from("user_roles").select("role").eq("user_id", user_id);
      const isTargetAdmin = (targetRoles || []).some((r: { role: string }) => r.role === "admin");
      if (isTargetAdmin && !isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can unban admin accounts" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await supabase.auth.admin.updateUserById(user_id, {
        ban_duration: "none",
      });
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
      // Prevent operators from deleting admins
      const { data: targetRolesD } = await supabase.from("user_roles").select("role").eq("user_id", user_id);
      const isTargetAdminD = (targetRolesD || []).some((r: { role: string }) => r.role === "admin");
      if (isTargetAdminD && !isAdmin) {
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
      // Only admins can grant or revoke the admin role
      if (role === "admin" && !isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden: only admins can manage the admin role" }), {
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

    if (action === "create_window") {
      const { label, starts_at, ends_at } = data;
      const { data: result, error } = await supabase
        .from("sentry_deployment_windows")
        .insert({ label, starts_at, ends_at, created_by: claimsData.claims.email || "operator" })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "capture_baseline") {
      const { snapshot, description, deployment_window_id } = data;
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

    if (action === "disengage_maintenance") {
      const { error } = await supabase
        .from("sentry_status")
        .update({
          maintenance_mode: false,
          updated_at: new Date().toISOString(),
        })
        .not("id", "is", null);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
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
