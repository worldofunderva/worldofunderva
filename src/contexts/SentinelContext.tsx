import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useAccount, useReadContract } from 'wagmi';

// Set to null until NFT contract is deployed
const SENTINEL_NFT_CONTRACT: `0x${string}` | null = null;

const ERC721_BALANCE_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
] as const;

interface SentinelContextType {
  hasSentinelNFT: boolean;
  isCheckingOwnership: boolean;
  isNFTContractReady: boolean;
  ownershipError: Error | null;
}

const SentinelContext = createContext<SentinelContextType | undefined>(undefined);

export function SentinelProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const shouldQuery = Boolean(SENTINEL_NFT_CONTRACT && isConnected && address);

  const { data: balance, isLoading, error } = useReadContract({
    address: SENTINEL_NFT_CONTRACT ?? undefined,
    abi: ERC721_BALANCE_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: shouldQuery,
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 5000),
    },
  });

  const value = useMemo<SentinelContextType>(() => ({
    hasSentinelNFT: Boolean(balance && balance > 0n),
    isCheckingOwnership: isLoading,
    isNFTContractReady: Boolean(SENTINEL_NFT_CONTRACT),
    ownershipError: error as Error | null,
  }), [balance, isLoading, error]);

  return (
    <SentinelContext.Provider value={value}>
      {children}
    </SentinelContext.Provider>
  );
}

export function useSentinel() {
  const context = useContext(SentinelContext);
  if (context === undefined) {
    throw new Error('useSentinel must be used within a SentinelProvider');
  }
  return context;
}
