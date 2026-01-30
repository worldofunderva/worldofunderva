import { useAccount } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';

// Supported chain IDs - Ethereum mainnet (1) and Base (8453)
const SUPPORTED_CHAIN_IDS: readonly number[] = [mainnet.id, base.id];

/**
 * Hook that checks if the current network is supported.
 * Uses useAccount().chainId to get the WALLET's actual network, not the app's configured chain.
 * Network enforcement (disconnect on unsupported) is handled by useWalletSessionPolicy.
 */
export function useNetworkEnforcement() {
  // useAccount().chainId returns the wallet's actual connected network
  const { chainId: walletChainId } = useAccount();

  return {
    isSupported: walletChainId ? SUPPORTED_CHAIN_IDS.includes(walletChainId) : true,
    chainId: walletChainId,
  };
}
