import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useCallback } from 'react';

/**
 * Hook that provides wallet connection utilities via native wagmi connectors.
 */
export function useWalletConnection() {
  const { address, isConnected, connector, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const login = useCallback(() => {
    // Connect with the first available connector (injected / MetaMask)
    const preferred = connectors[0];
    if (preferred) {
      connect({ connector: preferred });
    }
  }, [connect, connectors]);

  const logout = useCallback(async () => {
    try {
      await disconnectAsync();
    } catch {
      // best-effort
    }
  }, [disconnectAsync]);

  return {
    address,
    isConnected,
    connector,
    chain,
    connectors,
    truncatedAddress,
    login,
    logout,
    isConnecting,
    connect,
  };
}
