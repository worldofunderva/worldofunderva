import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Maintenance from '@/pages/Maintenance';
import { RefreshCw } from 'lucide-react';

interface MaintenanceGateProps {
  children: ReactNode;
}

export function MaintenanceGate({ children }: MaintenanceGateProps) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean | null>(null);

  useEffect(() => {
    checkMaintenanceMode();
    // Re-check every 30 seconds
    const interval = setInterval(checkMaintenanceMode, 30000);
    return () => clearInterval(interval);
  }, []);

  async function checkMaintenanceMode() {
    try {
      const { data, error } = await supabase
        .from('sentry_status')
        .select('maintenance_mode')
        .single();

      if (error) {
        // If we can't read (RLS blocks unauthenticated), assume not in maintenance
        // so the public site works. Authenticated admin checks happen server-side.
        setIsMaintenanceMode(false);
        return;
      }

      setIsMaintenanceMode(data?.maintenance_mode ?? false);
    } catch {
      setIsMaintenanceMode(false);
    }
  }

  if (isMaintenanceMode === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  return <>{children}</>;
}
