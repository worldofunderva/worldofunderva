import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { useCallback } from 'react';
import { clearWalletSessionData } from '@/lib/walletSession';

/**
 * Hook that provides wallet connection utilities.
 * Connects directly via the first available connector (no modal).
 */
export function useWalletConnection() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const disconnect = useCallback(async () => {
    await wagmiDisconnect();
    clearWalletSessionData();
  }, [wagmiDisconnect]);

  const handleConnect = useCallback(() => {
    // RainbowKit integration pending wagmi v3 support
  }, []);

  return {
    address,
    isConnected,
    connector,
    truncatedAddress,
    disconnect,
    handleConnect,
    connectors,
  };
}
