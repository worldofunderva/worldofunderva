import { createContext, useContext, ReactNode, useMemo } from 'react';

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
  // Without wallet connection, NFT ownership cannot be checked
  // This will be updated when wallet functionality is re-added
  const value = useMemo<SentinelContextType>(() => ({
    hasSentinelNFT: false,
    isCheckingOwnership: false,
    isNFTContractReady: false,
    ownershipError: null,
  }), []);

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
