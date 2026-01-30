import { useChainId } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';

// Supported chain IDs - Ethereum mainnet (1) and Base (8453)
const SUPPORTED_CHAIN_IDS: readonly number[] = [mainnet.id, base.id];

/**
 * Hook that checks if the current network is supported.
 * Network enforcement (disconnect on unsupported) is handled by useWalletSessionPolicy.
 */
export function useNetworkEnforcement() {
  const chainId = useChainId();

  return {
    isSupported: SUPPORTED_CHAIN_IDS.includes(chainId),
    chainId,
  };
}
