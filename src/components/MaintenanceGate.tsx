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
      const { data, error } = await supabase.rpc('is_maintenance_mode');

      if (error) {
        setIsMaintenanceMode(false);
        return;
      }

      setIsMaintenanceMode(data === true);
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
