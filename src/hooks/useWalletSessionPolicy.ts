import { useEffect, useRef, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import {
  clearWalletSessionData,
  setConnectedTimestamp,
  getSessionTimeRemaining,
} from '@/lib/walletSession';

/**
 * Enforces the wallet session policy:
 * 1. Force disconnect on EVERY page load (refresh, navigation, new tab)
 * 2. Auto-disconnect after 1 hour of connection
 * 3. No auto-reconnect - user must manually connect each time
 *
 * Network enforcement is handled by wagmi config (Base-only in chains array).
 */
export function useWalletSessionPolicy() {
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const hasRunInitialCleanupRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasConnectedRef = useRef(false);

  // ─── Force disconnect on EVERY page load ──────────────────────
  useEffect(() => {
    if (hasRunInitialCleanupRef.current) return;
    hasRunInitialCleanupRef.current = true;

    clearWalletSessionData();

    (async () => {
      try {
        await wagmiDisconnect();
      } catch {
        // Ignore - wallet might not be connected
      }
      clearWalletSessionData();
    })();
  }, [wagmiDisconnect]);

  // ─── Clear any running timeout ────────────────────────────────
  const clearSessionTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // ─── 1-hour session timeout ───────────────────────────────────
  useEffect(() => {
    if (isConnected && !wasConnectedRef.current) {
      // Just connected — record timestamp & schedule timeout
      wasConnectedRef.current = true;
      setConnectedTimestamp();

      const remaining = getSessionTimeRemaining();
      if (remaining <= 0) {
        // Already expired (shouldn't happen, but safety)
        wagmiDisconnect();
        clearWalletSessionData();
        return;
      }

      clearSessionTimeout();
      timeoutRef.current = setTimeout(() => {
        wagmiDisconnect();
        clearWalletSessionData();
      }, remaining);
    }

    if (!isConnected && wasConnectedRef.current) {
      // Disconnected — cleanup
      wasConnectedRef.current = false;
      clearSessionTimeout();
      clearWalletSessionData();
    }

    return () => {
      clearSessionTimeout();
    };
  }, [isConnected, wagmiDisconnect, clearSessionTimeout]);
}
