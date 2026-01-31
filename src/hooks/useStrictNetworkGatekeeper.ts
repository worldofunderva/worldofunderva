import { useEffect, useRef } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { base } from 'wagmi/chains';
import { clearWalletSessionData } from '@/lib/walletSession';

/**
 * Strict Network Gatekeeper
 * 
 * Security enforcement that:
 * - Monitors wallet connection and chain
 * - Immediately disconnects if user is on wrong network
 * - Shows alert instructing user to manually switch to Base
 * - Does NOT trigger wallet's "Switch Network" popup (passive enforcement)
 * 
 * This runs on every connection attempt and chain change.
 */
export function useStrictNetworkGatekeeper() {
  const { isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const hasAlertedRef = useRef(false);

  useEffect(() => {
    // Only check when connected
    if (!isConnected) {
      hasAlertedRef.current = false;
      return;
    }

    // Check if on supported network (Base only)
    const isOnBase = chainId === base.id;

    if (!isOnBase && !hasAlertedRef.current) {
      // Mark as alerted to prevent multiple alerts during disconnect
      hasAlertedRef.current = true;

      // Immediate disconnect - no auto-switch, just refuse
      disconnect();
      clearWalletSessionData();

      // Show access denied message
      window.alert(
        'Access Denied: Please manually switch your wallet to the Base Network to access World of Underva.'
      );
    }
  }, [isConnected, chainId, disconnect]);
}
