import { useState, useCallback, createContext, useContext, ReactNode } from 'react';

interface SentinelContextType {
  hasSentinelNFT: boolean;
  toggleSentinelNFT: () => void;
}

const SentinelContext = createContext<SentinelContextType | undefined>(undefined);

export function SentinelProvider({ children }: { children: ReactNode }) {
  const [hasSentinelNFT, setHasSentinelNFT] = useState(false);

  const toggleSentinelNFT = useCallback(() => {
    setHasSentinelNFT(prev => !prev);
  }, []);

  return (
    <SentinelContext.Provider value={{ hasSentinelNFT, toggleSentinelNFT }}>
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
