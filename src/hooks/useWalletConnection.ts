import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { useCallback, useState } from 'react';
import { clearWalletSessionData } from '@/lib/walletSession';

/**
 * Hook that provides wallet connection utilities.
 * Exposes a connector picker state for the UI.
 */
export function useWalletConnection() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { connect, connectors, isPending } = useConnect();
  const [showConnectors, setShowConnectors] = useState(false);

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const disconnect = useCallback(async () => {
    await wagmiDisconnect();
    clearWalletSessionData();
  }, [wagmiDisconnect]);

  const handleConnect = useCallback(() => {
    setShowConnectors((prev) => !prev);
  }, []);

  const connectWith = useCallback((connectorInstance: (typeof connectors)[number]) => {
    connect({ connector: connectorInstance });
    setShowConnectors(false);
  }, [connect]);

  return {
    address,
    isConnected,
    connector,
    truncatedAddress,
    disconnect,
    handleConnect,
    connectWith,
    connectors,
    showConnectors,
    setShowConnectors,
    isPending,
  };
}
