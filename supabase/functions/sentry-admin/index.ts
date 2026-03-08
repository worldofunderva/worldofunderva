import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await req.json();
    const { action, data } = body;

    if (action === "create_window") {
      const { label, starts_at, ends_at, created_by } = data;
      const { data: result, error } = await supabase
        .from("sentry_deployment_windows")
        .insert({ label, starts_at, ends_at, created_by: created_by || "admin" })
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

      // Update status with new baseline
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
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
