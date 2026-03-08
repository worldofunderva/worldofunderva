import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, Ban, Trash2, ShieldCheck, RefreshCw, UserPlus, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Member {
  id: string;
  email: string;
  display_name: string;
  provider: string;
  created_at: string;
  last_sign_in_at: string | null;
  banned: boolean;
  roles: string[];
}

const AVAILABLE_ROLES = ['admin', 'operator'] as const;

async function callAdmin(action: string, data: Record<string, unknown> = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Not authenticated');
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const res = await fetch(
    `https://${projectId}.supabase.co/functions/v1/sentry-admin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ action, data }),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
}

function CreateMemberForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', display_name: '', roles: [] as string[] });

  function toggleRole(role: string) {
    setForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role],
    }));
  }

  async function handleCreate() {
    if (!form.email || !form.password) {
      toast({ title: 'Missing fields', description: 'Email and password are required.', variant: 'destructive' });
      return;
    }
    if (form.password.length < 8) {
      toast({ title: 'Weak password', description: 'Password must be at least 8 characters.', variant: 'destructive' });
      return;
    }
    setCreating(true);
    try {
      await callAdmin('create_user', {
        email: form.email,
        password: form.password,
        display_name: form.display_name || undefined,
        roles: form.roles,
      });
      toast({ title: 'Team Member Created', description: `${form.email} can now sign in.` });
      setForm({ email: '', password: '', display_name: '', roles: [] });
      setOpen(false);
      onCreated();
    } catch (err) {
      toast({ title: 'Creation Failed', description: err instanceof Error ? err.message : 'Unknown error', variant: 'destructive' });
    }
    setCreating(false);
  }

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <UserPlus className="h-3.5 w-3.5 mr-1" />
        <span className="hidden sm:inline">Add Member</span>
        <span className="sm:hidden">Add</span>
      </Button>
    );
  }

  return (
    <div className="mb-4 p-3 sm:p-4 rounded-lg border border-primary/10 bg-secondary/20 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Create Team Member</h3>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="h-7 text-xs">Cancel</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Email *</Label>
          <Input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="team@example.com"
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Display Name</Label>
          <Input
            value={form.display_name}
            onChange={e => setForm({ ...form, display_name: e.target.value })}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs">Password *</Label>
        <div className="relative mt-1">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Minimum 8 characters"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div>
        <Label className="text-xs">Assign Roles</Label>
        <div className="flex items-center gap-4 mt-1.5">
          {AVAILABLE_ROLES.map(role => (
            <label key={role} className="flex items-center gap-1.5 cursor-pointer text-sm">
              <Checkbox
                checked={form.roles.includes(role)}
                onCheckedChange={() => toggleRole(role)}
              />
              <span className="capitalize">{role}</span>
            </label>
          ))}
        </div>
      </div>
      <Button size="sm" onClick={handleCreate} disabled={creating}>
        {creating ? <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" /> : <UserPlus className="h-3.5 w-3.5 mr-1" />}
        {creating ? 'Creating...' : 'Create Account'}
      </Button>
    </div>
  );
}

function MemberCard({ member, actionLoading, onBan, onDelete, onRoleToggle }: {
  member: Member;
  actionLoading: string | null;
  onBan: (userId: string, ban: boolean) => void;
  onDelete: (userId: string) => void;
  onRoleToggle: (userId: string, role: string, grant: boolean) => void;
}) {
  const isLoading = actionLoading === member.id;

  return (
    <div className={`rounded-lg border border-primary/10 bg-secondary/10 p-3 space-y-3 ${member.banned ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{member.display_name}</p>
          <p className="text-xs text-muted-foreground truncate">{member.email}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {member.banned ? (
            <Badge variant="destructive" className="text-xs">Banned</Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">Active</Badge>
          )}
          <Badge variant="outline" className="text-xs capitalize">{member.provider}</Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {AVAILABLE_ROLES.map((role) => (
            <label key={role} className="flex items-center gap-1 cursor-pointer">
              <Checkbox
                checked={member.roles.includes(role)}
                disabled={isLoading}
                onCheckedChange={(checked) => onRoleToggle(member.id, role, !!checked)}
              />
              <span className="capitalize">{role}</span>
            </label>
          ))}
        </div>
        <span>Joined {new Date(member.created_at).toLocaleDateString()}</span>
        <span>Last in: {member.last_sign_in_at ? new Date(member.last_sign_in_at).toLocaleDateString() : 'Never'}</span>
      </div>

      <div className="flex items-center gap-1 pt-1 border-t border-primary/5">
        <Button
          variant="ghost"
          size="sm"
          disabled={isLoading}
          onClick={() => onBan(member.id, !member.banned)}
          className="h-7 text-xs gap-1"
        >
          {member.banned ? <ShieldCheck className="h-3.5 w-3.5 text-primary" /> : <Ban className="h-3.5 w-3.5 text-destructive" />}
          {member.banned ? 'Unban' : 'Ban'}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" disabled={isLoading} className="h-7 text-xs gap-1 text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="mx-4 max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription>
                Permanently delete <strong>{member.email}</strong>? This removes their login credentials and all access. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(member.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Permanently
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default function TeamMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchMembers() {
    setLoading(true);
    try {
      const data = await callAdmin('list_users');
      setMembers(data);
    } catch (err) {
      toast({ title: 'Failed to load members', description: err instanceof Error ? err.message : 'Unknown error', variant: 'destructive' });
    }
    setLoading(false);
  }

  useEffect(() => { fetchMembers(); }, []);

  async function handleBan(userId: string, ban: boolean) {
    setActionLoading(userId);
    try {
      await callAdmin(ban ? 'ban_user' : 'unban_user', { user_id: userId });
      toast({ title: ban ? 'User Banned' : 'User Unbanned' });
      await fetchMembers();
    } catch (err) {
      toast({ title: 'Action Failed', description: err instanceof Error ? err.message : 'Unknown error', variant: 'destructive' });
    }
    setActionLoading(null);
  }

  async function handleDelete(userId: string) {
    setActionLoading(userId);
    try {
      await callAdmin('delete_user', { user_id: userId });
      toast({ title: 'User Deleted', description: 'Login credentials have been permanently removed.' });
      await fetchMembers();
    } catch (err) {
      toast({ title: 'Delete Failed', description: err instanceof Error ? err.message : 'Unknown error', variant: 'destructive' });
    }
    setActionLoading(null);
  }

  async function handleRoleToggle(userId: string, role: string, grant: boolean) {
    setActionLoading(userId);
    try {
      await callAdmin('set_role', { user_id: userId, role, grant });
      toast({ title: grant ? `Granted ${role}` : `Revoked ${role}` });
      await fetchMembers();
    } catch (err) {
      toast({ title: 'Role Update Failed', description: err instanceof Error ? err.message : 'Unknown error', variant: 'destructive' });
    }
    setActionLoading(null);
  }

  return (
    <Card className="p-4 sm:p-6 border-primary/10">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Team Members</h2>
        </div>
        <div className="flex items-center gap-2">
          <CreateMemberForm onCreated={fetchMembers} />
          <Button variant="outline" size="sm" onClick={fetchMembers} disabled={loading}>
            <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : members.length === 0 ? (
        <p className="text-sm text-muted-foreground">No members found.</p>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              actionLoading={actionLoading}
              onBan={handleBan}
              onDelete={handleDelete}
              onRoleToggle={handleRoleToggle}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
