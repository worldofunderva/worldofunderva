import { useAccount } from 'wagmi';
import { base } from 'wagmi/chains';

// Supported chain IDs - Base only (8453) for NFT minting
const SUPPORTED_CHAIN_IDS: readonly number[] = [base.id];

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
