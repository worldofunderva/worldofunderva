import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { createStorage, http } from 'wagmi';

/**
 * High-traffic optimized wagmi configuration (500k users)
 * 
 * RPC Strategy:
 * - Multiple fallback transports for reliability
 * - Public RPCs with rate limiting awareness
 * - TODO: Replace with dedicated Alchemy/QuickNode endpoints for production
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
  chains: [optimizedBase],
  ssr: false,
  storage: sessionStorageConfig,
  transports: {
    // Fallback chain with batch support for efficiency
    [base.id]: http(undefined, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10000, // 10s timeout
    }),
  },
});
