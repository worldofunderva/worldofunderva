import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  hasSentinelNFT: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  toggleSentinelNFT: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [hasSentinelNFT, setHasSentinelNFT] = useState(false);

  const connectWallet = useCallback(() => {
    // Simulated wallet connection
    const mockAddress = "0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6);
    setAddress(mockAddress);
    setIsConnected(true);
  }, []);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setHasSentinelNFT(false);
  }, []);

  const toggleSentinelNFT = useCallback(() => {
    setHasSentinelNFT(prev => !prev);
  }, []);

  return (
    <WalletContext.Provider value={{
      isConnected,
      address,
      hasSentinelNFT,
      connectWallet,
      disconnectWallet,
      toggleSentinelNFT,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
