import { createConfig, createStorage, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

/**
 * World of Underva - Strict Base-Only Configuration
 * 
 * Uses wagmi native connectors (no RainbowKit dependency).
 * - ONLY Base chain supported
 * - Session storage only (cleared on tab close)
 * - No auto-reconnect on page refresh
 */

const sessionStorageConfig = createStorage({
  storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
});

const optimizedBase = {
  ...base,
  rpcUrls: {
    default: {
      http: [
        'https://mainnet.base.org',
        'https://base.llamarpc.com',
        'https://1rpc.io/base',
      ],
    },
  },
} as const;

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'b8b0d345dc3ec1a6f26d12331973af0f';

export const config = createConfig({
  chains: [optimizedBase],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'World of Underva' }),
  ],
  storage: sessionStorageConfig,
  transports: {
    [base.id]: http(undefined, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10000,
    }),
  },
});
