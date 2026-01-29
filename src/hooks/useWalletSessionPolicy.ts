import { useEffect, useRef } from 'react';
import { useAccount, useChainId, useDisconnect } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { toast } from '@/hooks/use-toast';
import { clearWalletSessionData } from '@/lib/walletSession';

// Supported chain IDs - Ethereum mainnet (1) and Base (8453)
const SUPPORTED_CHAIN_IDS: readonly number[] = [mainnet.id, base.id];

// Session key to track if this is a fresh page load
const SESSION_INITIALIZED_KEY = 'wou_session_initialized';

/**
 * Enforces the wallet session policy:
 * - Force disconnect on fresh page load (new tab/browser session)
 * - No persisted auto-reconnect across browser sessions
 * - Disconnect if user connects on an unsupported network
 * - Clear residual connector storage on load/unload
 * - Wallet stays connected as long as the tab is open
 */
export function useWalletSessionPolicy() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const hasForcedDisconnectRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // Force disconnect on fresh page load (browser was closed/reopened)
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    // Check if this is a fresh session (browser was closed)
    const wasInitialized = sessionStorage.getItem(SESSION_INITIALIZED_KEY);
    
    if (!wasInitialized) {
      // Fresh session - clear all wallet data and force disconnect
      clearWalletSessionData();
      
      // Mark session as initialized
      sessionStorage.setItem(SESSION_INITIALIZED_KEY, 'true');
      
      // If somehow still connected, force disconnect
      if (isConnected) {
        (async () => {
          try {
            await wagmiDisconnect();
          } catch {
            // Ignore disconnect errors on init
          }
          clearWalletSessionData();
        })();
      }
    }
  }, [isConnected, wagmiDisconnect]);

  // Clear connector state when leaving/reloading the page.
  useEffect(() => {
    const handleExit = () => {
      clearWalletSessionData();
      // Also clear our session marker so next visit is fresh
      sessionStorage.removeItem(SESSION_INITIALIZED_KEY);
    };

    window.addEventListener('beforeunload', handleExit);
    window.addEventListener('pagehide', handleExit);

    return () => {
      window.removeEventListener('beforeunload', handleExit);
      window.removeEventListener('pagehide', handleExit);
    };
  }, []);

  // Enforce allowed networks (Ethereum/Base only).
  useEffect(() => {
    if (!isConnected) {
      hasForcedDisconnectRef.current = false;
      return;
    }

    const isSupported = SUPPORTED_CHAIN_IDS.includes(chainId);
    if (!isSupported && !hasForcedDisconnectRef.current) {
      hasForcedDisconnectRef.current = true;

      toast({
        title: 'Unsupported Network',
        description: 'Switch your wallet to Ethereum or Base, then reconnect.',
        variant: 'destructive',
      });

      (async () => {
        try {
          await wagmiDisconnect();
        } finally {
          clearWalletSessionData();
        }
      })();
    }
  }, [isConnected, chainId, wagmiDisconnect]);
}
