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

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? '';
if (!projectId) {
  console.warn('VITE_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will not work until it is configured.');
}

const connectors = [
  injected(),
  coinbaseWallet({ appName: 'World of Underva' }),
  ...(projectId ? [walletConnect({ projectId })] : []),
];

export const config = createConfig({
  chains: [optimizedBase],
  connectors,
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
