import { useEffect, useRef } from 'react';
import { useAccount, useChainId, useDisconnect } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { toast } from '@/hooks/use-toast';
import { clearWalletSessionData } from '@/lib/walletSession';

// Supported chain IDs - Ethereum mainnet (1) and Base (8453)
const SUPPORTED_CHAIN_IDS: readonly number[] = [mainnet.id, base.id];

/**
 * Enforces the wallet session policy:
 * - Force disconnect on EVERY page load (refresh, navigation, new tab)
 * - No auto-reconnect - user must manually connect each time
 * - Disconnect if user connects on an unsupported network
 * - Wallet only stays connected while actively on the page without refresh
 */
export function useWalletSessionPolicy() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const hasForcedDisconnectRef = useRef(false);
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
