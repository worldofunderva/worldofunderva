import { Shield, AlertTriangle } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
            <Shield className="h-10 w-10 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">Site Under Maintenance</h1>
          </div>
          <p className="text-muted-foreground">
            Our security systems have detected an infrastructure change that requires review.
            The site is temporarily locked down while our team investigates.
          </p>
        </div>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Sentry Guard</span> has engaged maintenance mode.
            All site features are disabled until an administrator resolves the issue.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          If you are an administrator, access the Sentry Guard Dashboard to review and resolve.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
