import { useEffect, useRef } from 'react';
import { useAccount, useChainId, useDisconnect } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { toast } from '@/hooks/use-toast';
import { clearWalletSessionData } from '@/lib/walletSession';

// Supported chain IDs - Ethereum mainnet (1) and Base (8453)
const SUPPORTED_CHAIN_IDS: readonly number[] = [mainnet.id, base.id];

/**
 * Enforces the wallet session policy:
 * - No persisted auto-reconnect (handled via in-memory wagmi storage)
 * - Disconnect if user connects on an unsupported network
 * - Clear residual connector storage on load/unload
 * - Wallet stays connected as long as the tab is open
 */
export function useWalletSessionPolicy() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const hasForcedDisconnectRef = useRef(false);

  // Clean start: prevent any persisted connector state from auto-connecting.
  useEffect(() => {
    clearWalletSessionData();
  }, []);

  // Clear connector state when leaving/reloading the page.
  useEffect(() => {
    const handleExit = () => {
      clearWalletSessionData();
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
