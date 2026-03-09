import { useEffect, useRef } from 'react';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import {
  clearWalletSessionData,
  setConnectedTimestamp,
  getSessionTimeRemaining,
} from '@/lib/walletSession';

const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour
const REFRESH_DISCONNECT_KEY = 'underva_session_active';

/**
 * Enforces two session policies:
 * 1. Disconnect on every page refresh (sessionStorage flag cleared on load).
 * 2. Auto-disconnect after 1 hour from initial connection.
 */
export function useWalletSessionPolicy() {
  const { isConnected, logout, ready } = useWalletConnection();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasDisconnectedOnLoad = useRef(false);

  // ── Policy 1: Disconnect on page refresh ──
  // On mount, if there's no fresh session flag, force disconnect.
  useEffect(() => {
    if (!ready || hasDisconnectedOnLoad.current) return;
    hasDisconnectedOnLoad.current = true;

    const wasActive = sessionStorage.getItem(REFRESH_DISCONNECT_KEY);
    // We always remove the flag first — it's set only while connected.
    sessionStorage.removeItem(REFRESH_DISCONNECT_KEY);

    // If the page just loaded and there's a lingering connection, disconnect.
    // The flag being absent means this is a fresh page load (not a React re-render).
    if (!wasActive && isConnected) {
      clearWalletSessionData();
      logout();
    }
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keep the session flag alive while connected ──
  useEffect(() => {
    if (isConnected) {
      sessionStorage.setItem(REFRESH_DISCONNECT_KEY, '1');
    } else {
      sessionStorage.removeItem(REFRESH_DISCONNECT_KEY);
    }
  }, [isConnected]);

  // ── Policy 2: 1-hour timeout auto-disconnect ──
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!isConnected) return;

    // Record connection time (idempotent — only sets if not already set)
    setConnectedTimestamp();

    const remaining = getSessionTimeRemaining();
    const delay = remaining > 0 ? remaining : SESSION_TIMEOUT_MS;

    timerRef.current = setTimeout(() => {
      clearWalletSessionData();
      logout();
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps
}
