import { useEffect } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { toast } from '@/hooks/use-toast';

// Supported chain IDs - Ethereum mainnet (1) and Base (8453)
const SUPPORTED_CHAIN_IDS: readonly number[] = [mainnet.id, base.id];

/**
 * Hook that monitors the connected wallet's network and prompts 
 * users to switch if they're on an unsupported network.
 */
export function useNetworkEnforcement() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (!isConnected) return;

    const isSupported = SUPPORTED_CHAIN_IDS.includes(chainId);

    if (!isSupported) {
      toast({
        title: "Unsupported Network",
        description: "Please switch to Ethereum or Base network to use this app.",
        variant: "destructive",
      });

      // Automatically prompt to switch to Ethereum mainnet
      if (switchChain) {
        switchChain({ chainId: mainnet.id });
      }
    }
  }, [isConnected, chainId, switchChain]);

  return {
    isSupported: SUPPORTED_CHAIN_IDS.includes(chainId),
    chainId,
  };
}
