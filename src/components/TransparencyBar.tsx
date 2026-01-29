import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Audit report configuration - update these when audit is complete
const AUDIT_FIRM_NAME: string = 'Hacken';
const AUDIT_REPORT_URL: string | null = null; // Set to actual URL when available

export function TransparencyBar() {
  const isAuditReady = Boolean(AUDIT_REPORT_URL);

  return (
    <div className="bg-card/50 border-t border-border py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <span>Smart Contracts Audited by</span>
          <span className="font-medium text-foreground">{AUDIT_FIRM_NAME}</span>
          <span>–</span>
          {isAuditReady ? (
            <a
              href={AUDIT_REPORT_URL!}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1 font-medium text-primary",
                "hover:underline transition-colors"
              )}
            >
              View Report
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="text-muted-foreground/70 italic">Report Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );
}
