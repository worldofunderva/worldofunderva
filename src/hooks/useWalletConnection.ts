import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';

/**
 * Clears all wallet-related session data for security.
 * This ensures no residual connection state persists.
 */
function clearWalletSessionData() {
  if (typeof window === 'undefined') return;
  
  // Clear sessionStorage keys related to wagmi/wallet connections
  const keysToRemove: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && (
      key.startsWith('wagmi') || 
      key.startsWith('wc@') || 
      key.startsWith('walletconnect') ||
      key.includes('wallet') ||
      key.includes('connector')
    )) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => sessionStorage.removeItem(key));
  
  // Also clear any localStorage remnants (from previous sessions or third-party wallets)
  const localKeysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.startsWith('wagmi') || 
      key.startsWith('wc@') || 
      key.startsWith('walletconnect') ||
      key.includes('wallet') ||
      key.includes('connector')
    )) {
      localKeysToRemove.push(key);
    }
  }
  localKeysToRemove.forEach(key => localStorage.removeItem(key));
}

/**
 * Hook that provides wallet connection utilities with safeguards
 * to prevent multiple simultaneous wallet connections.
 * 
 * Security features:
 * - Uses sessionStorage (cleared on tab/browser close)
 * - Explicit session cleanup on disconnect
 * - No auto-reconnect on page refresh
 */
export function useWalletConnection() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  /**
   * Secure disconnect that clears all session data.
   * User will need to reconnect on their next visit.
   */
  const disconnect = useCallback(async () => {
    await wagmiDisconnect();
    clearWalletSessionData();
  }, [wagmiDisconnect]);

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
