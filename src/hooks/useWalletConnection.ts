import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { useCallback, useState } from 'react';
import { clearWalletSessionData } from '@/lib/walletSession';

/**
 * Hook that provides wallet connection utilities.
 * Uses wagmi native connectors (no RainbowKit).
 */
export function useWalletConnection() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const [showConnectModal, setShowConnectModal] = useState(false);

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const disconnect = useCallback(async () => {
    await wagmiDisconnect();
    clearWalletSessionData();
  }, [wagmiDisconnect]);

  const handleConnect = useCallback(() => {
    if (isConnected) {
      return;
    }
    setShowConnectModal(true);
  }, [isConnected]);

  const connectWithConnector = useCallback((connectorId: number) => {
    const c = connectors[connectorId];
    if (c) {
      connect({ connector: c });
      setShowConnectModal(false);
    }
  }, [connectors, connect]);

  const closeConnectModal = useCallback(() => {
    setShowConnectModal(false);
  }, []);

  return {
    address,
    isConnected,
    connector,
    truncatedAddress,
    disconnect,
    handleConnect,
    connectWithConnector,
    closeConnectModal,
    showConnectModal,
    connectors,
  };
}
