import { useEffect, useRef } from 'react';
import { useDisconnect } from 'wagmi';
import { clearWalletSessionData } from '@/lib/walletSession';

/**
 * Enforces the wallet session policy:
 * - Force disconnect on EVERY page load (refresh, navigation, new tab)
 * - No auto-reconnect - user must manually connect each time
 * - Wallet only stays connected while actively on the page without refresh
 * 
 * Network enforcement is handled by wagmi config (Base-only in chains array).
 * wagmi will automatically prompt users to switch to Base.
 */
export function useWalletSessionPolicy() {
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const hasRunInitialCleanupRef = useRef(false);

  // Force disconnect on EVERY page load - no auto-reconnect ever
  useEffect(() => {
    if (hasRunInitialCleanupRef.current) return;
    hasRunInitialCleanupRef.current = true;

    // Always clear wallet data on page load
    clearWalletSessionData();

    // Force disconnect any lingering connection from wallet provider memory
    (async () => {
      try {
        await wagmiDisconnect();
      } catch {
        // Ignore errors - wallet might not be connected
      }
      clearWalletSessionData();
    })();
  }, [wagmiDisconnect]);
}
