import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';

/**
 * Hook that provides wallet connection utilities with safeguards
 * to prevent multiple simultaneous wallet connections.
 */
export function useWalletConnection() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  /**
   * Safely open the connect modal.
   * If already connected, opens account modal instead to prevent multiple connections.
   */
  const handleConnect = useCallback(() => {
    if (isConnected) {
      // Already connected - open account modal to manage existing connection
      openAccountModal?.();
    } else {
      openConnectModal?.();
    }
  }, [isConnected, openConnectModal, openAccountModal]);

  /**
   * Disconnect the current wallet before allowing a new connection.
   * This prevents the issue of having multiple wallets connected.
   */
  const handleDisconnectAndConnect = useCallback(async () => {
    if (isConnected) {
      await disconnect();
      // Small delay to ensure disconnection is complete
      setTimeout(() => {
        openConnectModal?.();
      }, 100);
    } else {
      openConnectModal?.();
    }
  }, [isConnected, disconnect, openConnectModal]);

  return {
    address,
    isConnected,
    connector,
    truncatedAddress,
    disconnect,
    handleConnect,
    handleDisconnectAndConnect,
    openAccountModal,
    openConnectModal,
  };
}
