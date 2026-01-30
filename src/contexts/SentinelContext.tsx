import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useAccount, useReadContract } from 'wagmi';

// Sentinel NFT Contract Configuration
// Set to null until NFT contract is deployed, then replace with actual address
// Example: '0xabcdef1234567890abcdef1234567890abcdef12' as `0x${string}`
const SENTINEL_NFT_CONTRACT: `0x${string}` | null = null;

// Minimal ERC-721 ABI for ownership check
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
  /** Whether the connected wallet owns a Sentinel NFT */
  hasSentinelNFT: boolean;
  /** Whether NFT ownership check is in progress */
  isCheckingOwnership: boolean;
  /** Whether the NFT contract is deployed and configured */
  isNFTContractReady: boolean;
  /** Error from ownership check, if any */
  ownershipError: Error | null;
}

const SentinelContext = createContext<SentinelContextType | undefined>(undefined);

export function SentinelProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();

  // Only query if contract is configured and wallet is connected
  const shouldQuery = Boolean(SENTINEL_NFT_CONTRACT && isConnected && address);

  const { data: balance, isLoading, error } = useReadContract({
    address: SENTINEL_NFT_CONTRACT ?? undefined,
    abi: ERC721_BALANCE_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: shouldQuery,
      staleTime: 1000 * 60 * 1, // 1 minute staleTime (high-traffic optimization)
      gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    },
  });

  const value = useMemo<SentinelContextType>(() => ({
    // User has NFT if balance > 0
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
