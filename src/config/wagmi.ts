import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { createStorage, http } from 'wagmi';

/**
 * World of Underva - Strict Base-Only Configuration
 * 
 * Security Policy:
 * - ONLY Base chain supported (no Ethereum mainnet)
 * - No auto-reconnect on page refresh
 * - No auto-switch prompts - connection refused if wrong network
 * - Session storage only (cleared on tab close)
 */

// Session storage for wallet state (clears on tab close)
const sessionStorageConfig = createStorage({
  storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
});

// Custom Base chain with optimized RPC fallbacks
const optimizedBase = {
  ...base,
  rpcUrls: {
    default: {
      http: [
        'https://mainnet.base.org', // Official Base RPC
        'https://base.llamarpc.com', // LlamaNodes (free tier, good reliability)
        'https://1rpc.io/base', // 1RPC (privacy-focused)
      ],
    },
  },
} as const;

export const config = getDefaultConfig({
  appName: 'World of Underva',
  projectId: 'b8b0d345dc3ec1a6f26d12331973af0f',
  chains: [optimizedBase], // ONLY Base - no other chains
  ssr: false,
  storage: sessionStorageConfig,
  // App metadata for WalletConnect
  appDescription: 'Enter the World of Underva - Sentinel NFT Mint on Base',
  appUrl: 'https://worldofunderva.org',
  appIcon: 'https://worldofunderva.org/favicon.ico',
  transports: {
    [base.id]: http(undefined, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10000,
    }),
  },
});
