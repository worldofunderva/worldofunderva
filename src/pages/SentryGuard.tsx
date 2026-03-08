import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertTriangle, CheckCircle, Clock, Plus, RefreshCw, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import TeamMembers from '@/components/sentry/TeamMembers';

interface SentryStatusRow {
  id: string;
  maintenance_mode: boolean;
  last_check_at: string | null;
  last_baseline_id: string | null;
  updated_at: string;
}

interface SentryAlertRow {
  id: string;
  alert_type: string;
  details: string;
  maintenance_mode_engaged: boolean;
  telegram_sent: boolean;
  resolved: boolean;
  resolved_at: string | null;
  created_at: string;
}

interface DeploymentWindowRow {
  id: string;
  label: string;
  starts_at: string;
  ends_at: string;
  created_by: string;
  created_at: string;
}

export default function SentryGuardPage() {
  const [status, setStatus] = useState<SentryStatusRow | null>(null);
  const [alerts, setAlerts] = useState<SentryAlertRow[]>([]);
  const [windows, setWindows] = useState<DeploymentWindowRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [showNewWindow, setShowNewWindow] = useState(false);
  const [newWindow, setNewWindow] = useState({ label: '', starts_at: '', ends_at: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [disengaging, setDisengaging] = useState(false);

  useEffect(() => {
    fetchData();
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data } = await supabase.rpc('has_role', { _user_id: session.user.id, _role: 'admin' });
      setIsAdmin(data === true);
    }
  }

  async function fetchData() {
    setLoading(true);
    const [statusRes, alertsRes, windowsRes] = await Promise.all([
      supabase.from('sentry_status').select('*').single(),
      supabase.from('sentry_alerts').select('*').order('created_at', { ascending: false }).limit(20),
      supabase.from('sentry_deployment_windows').select('*').order('created_at', { ascending: false }),
    ]);
    if (statusRes.data) setStatus(statusRes.data as unknown as SentryStatusRow);
    if (alertsRes.data) setAlerts(alertsRes.data as unknown as SentryAlertRow[]);
    if (windowsRes.data) setWindows(windowsRes.data as unknown as DeploymentWindowRow[]);
    setLoading(false);
  }

  async function triggerManualCheck() {
    setRunning(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast({ title: 'Error', description: 'Not authenticated', variant: 'destructive' });
        setRunning(false);
        return;
      }
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/sentry-guard`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );
      const data = await res.json();
      toast({
        title: 'Sentry Guard Check Complete',
        description: data.message || JSON.stringify(data),
      });
      await fetchData();
    } catch (err) {
      toast({
        title: 'Check Failed',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
    setRunning(false);
  }

  async function createDeploymentWindow() {
    if (!newWindow.label || !newWindow.starts_at || !newWindow.ends_at) return;
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Not authenticated');
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/sentry-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            action: 'create_window',
            data: {
              label: newWindow.label,
              starts_at: new Date(newWindow.starts_at).toISOString(),
              ends_at: new Date(newWindow.ends_at).toISOString(),
            },
          }),
        }
      );
      if (!res.ok) throw new Error('Failed to create window');
      toast({ title: 'Deployment Window Created', description: `"${newWindow.label}" registered.` });
      setShowNewWindow(false);
      setNewWindow({ label: '', starts_at: '', ends_at: '' });
      await fetchData();
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
    setShowNewWindow(false);
    setNewWindow({ label: '', starts_at: '', ends_at: '' });
  }

  async function disengageMaintenanceAndRebaseline() {
    setDisengaging(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Not authenticated');
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      };

      // 1. Capture a fresh baseline so future scans match current state
      const baselineRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/sentry-admin`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            action: 'capture_baseline',
            data: { description: 'Post-maintenance baseline after review' },
          }),
        }
      );
      if (!baselineRes.ok) throw new Error('Failed to capture baseline');

      // 2. Disengage maintenance mode
      const disengageRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/sentry-admin`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ action: 'disengage_maintenance', data: {} }),
        }
      );
      if (!disengageRes.ok) throw new Error('Failed to disengage maintenance');

      toast({ title: 'Maintenance Disengaged', description: 'New baseline captured. System is operational.' });
      await fetchData();
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
    setDisengaging(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/15 text-primary shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold">Sentry Guard</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Frontend Infrastructure & Integrity Auditor</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button onClick={triggerManualCheck} disabled={running} size="sm">
              <RefreshCw className={`h-4 w-4 mr-1.5 ${running ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">{running ? 'Scanning...' : 'Run Check'}</span>
              <span className="xs:hidden">{running ? '...' : 'Scan'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                toast({ title: 'Signed out' });
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card className="p-4 sm:p-6 border-primary/20">
          <h2 className="text-sm font-semibold mb-3 sm:mb-4">System Status</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              {status?.maintenance_mode ? (
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              ) : (
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              )}
              <div>
                <p className="text-xs text-muted-foreground">Mode</p>
                <Badge variant={status?.maintenance_mode ? 'destructive' : 'default'}>
                  {status?.maintenance_mode ? 'MAINTENANCE' : 'OPERATIONAL'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Last Check</p>
                <p className="text-sm font-medium truncate">
                  {status?.last_check_at
                    ? new Date(status.last_check_at).toLocaleString()
                    : 'Never'}
                </p>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Baseline ID</p>
              <p className="text-xs font-mono text-muted-foreground truncate">
                {status?.last_baseline_id || 'No baseline'}
              </p>
            </div>
          </div>
          {/* Disengage button for admin when in maintenance */}
          {status?.maintenance_mode && isAdmin && (
            <div className="mt-4 pt-4 border-t border-destructive/20">
              <Button
                onClick={disengageMaintenanceAndRebaseline}
                disabled={disengaging}
                variant="outline"
                size="sm"
                className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
              >
                <CheckCircle className={`h-4 w-4 mr-1.5 ${disengaging ? 'animate-spin' : ''}`} />
                {disengaging ? 'Resolving...' : 'Mark as Resolved & Re-baseline'}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Captures a fresh baseline from current state and disengages maintenance mode.
              </p>
            </div>
          )}
        </Card>

        {/* Deployment Windows */}
        <Card className="p-4 sm:p-6 border-primary/10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-sm font-semibold">Deployment Windows</h2>
            <Button variant="outline" size="sm" onClick={() => setShowNewWindow(!showNewWindow)}>
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">New Window</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>

          {showNewWindow && (
            <div className="mb-4 p-3 sm:p-4 rounded-lg border border-primary/10 bg-secondary/20 space-y-3">
              <div>
                <Label className="text-xs">Label</Label>
                <Input
                  value={newWindow.label}
                  onChange={(e) => setNewWindow({ ...newWindow, label: e.target.value })}
                  placeholder="e.g. Contract Upgrade v2"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Start</Label>
                  <Input
                    type="datetime-local"
                    value={newWindow.starts_at}
                    onChange={(e) => setNewWindow({ ...newWindow, starts_at: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">End</Label>
                  <Input
                    type="datetime-local"
                    value={newWindow.ends_at}
                    onChange={(e) => setNewWindow({ ...newWindow, ends_at: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button size="sm" onClick={createDeploymentWindow}>Create Window</Button>
            </div>
          )}

          {windows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No deployment windows registered.</p>
          ) : (
            <div className="space-y-2">
              {windows.map((w) => (
                <div key={w.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-primary/10 bg-secondary/20 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{w.label}</p>
                    <p className="text-xs text-muted-foreground break-words">
                      {new Date(w.starts_at).toLocaleString()} — {new Date(w.ends_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs self-start sm:self-auto shrink-0">{w.created_by}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Team Members & Access Log - Admin only */}
        {isAdmin && <TeamMembers />}

        {/* Alert Log */}
        <Card className="p-4 sm:p-6 border-primary/10">
          <h2 className="text-sm font-semibold mb-3 sm:mb-4">Alert Log</h2>
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts recorded. System is clean.</p>
          ) : (
            <div className="space-y-2">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className={`rounded-lg border p-3 ${
                    a.resolved
                      ? 'border-primary/10 bg-secondary/10 opacity-70'
                      : 'border-destructive/20 bg-destructive/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      {a.resolved ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                      )}
                      <span className={`text-sm font-semibold ${a.resolved ? 'text-muted-foreground line-through' : 'text-destructive'}`}>
                        {a.alert_type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-6 sm:ml-0">
                      {a.resolved && (
                        <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-500">Resolved</Badge>
                      )}
                      {a.telegram_sent && (
                        <Badge variant="outline" className="text-xs">Telegram Sent</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6 sm:ml-0">{a.details}</p>
                  {a.resolved && a.resolved_at && (
                    <p className="text-xs text-emerald-500/70 ml-6 sm:ml-0 mt-1">
                      Resolved: {new Date(a.resolved_at).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Scope Notice */}
        <div className="text-center text-xs text-muted-foreground py-4 border-t border-primary/5 px-2">
          Sentry Guard is strictly infrastructure focused. It operates independently of financial ledger processes and external AI agents.
        </div>
      </div>
    </div>
  );
}
