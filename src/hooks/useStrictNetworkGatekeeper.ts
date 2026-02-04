import { useAccount } from 'wagmi';
import { base } from 'wagmi/chains';

/**
 * Strict Network Gatekeeper
 * 
 * Security enforcement that:
 * - Monitors wallet connection and chain
 * - Returns network status for UI to display warning banner
 * - Base network is the only supported network
 * 
 * The banner-based approach is less intrusive than auto-disconnect,
 * allowing users to switch networks without losing connection.
 */
export function useStrictNetworkGatekeeper() {
  const { isConnected, chainId } = useAccount();

  const isOnBase = chainId === base.id;
  const isWrongNetwork = isConnected && !isOnBase;

  return {
    isWrongNetwork,
    isOnBase,
    chainId,
  };
}
