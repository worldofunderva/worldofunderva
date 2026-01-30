import { useEffect, useRef } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { base } from 'wagmi/chains';
import { toast } from '@/hooks/use-toast';
import { clearWalletSessionData } from '@/lib/walletSession';

// Supported chain IDs - Base only (8453) for NFT minting
const SUPPORTED_CHAIN_IDS: readonly number[] = [base.id];

/**
 * Enforces the wallet session policy:
 * - Force disconnect on EVERY page load (refresh, navigation, new tab)
 * - No auto-reconnect - user must manually connect each time
 * - Disconnect if user connects on an unsupported network (uses wallet's actual chain)
 * - Wallet only stays connected while actively on the page without refresh
 */
export function useWalletSessionPolicy() {
  // useAccount().chainId returns the WALLET's actual network, not the app's configured chain
  const { isConnected, chainId: walletChainId } = useAccount();
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
  // Uses wallet's actual chainId, not app's configured chain.
  // NO auto-switch - simply disconnect and show access denied alert.
  useEffect(() => {
    if (!isConnected) {
      hasForcedDisconnectRef.current = false;
      return;
    }

    // walletChainId is undefined during connection, wait for it to resolve
    if (walletChainId === undefined) return;

    const isSupported = SUPPORTED_CHAIN_IDS.includes(walletChainId);
    if (!isSupported && !hasForcedDisconnectRef.current) {
      hasForcedDisconnectRef.current = true;

      // Show access denied alert - do NOT auto-switch networks
      toast({
        title: 'Access Denied',
        description: 'Please switch your wallet to Base network to connect.',
        variant: 'destructive',
        duration: 6000,
      });

      // Immediately disconnect - user must manually switch network and reconnect
      (async () => {
        try {
          await wagmiDisconnect();
        } finally {
          clearWalletSessionData();
        }
      })();
    }
  }, [isConnected, walletChainId, wagmiDisconnect]);
}
