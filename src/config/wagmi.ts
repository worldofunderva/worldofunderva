import { http } from 'wagmi';
import { base } from 'wagmi/chains';
import { createConfig } from '@privy-io/wagmi';

/**
 * World of Underva - Privy + Wagmi Configuration
 * 
 * Uses @privy-io/wagmi createConfig (no connectors needed — Privy handles those).
 * ONLY Base chain supported.
 */

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

export const config = createConfig({
  chains: [optimizedBase],
  transports: {
    [base.id]: http(undefined, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10000,
    }),
  },
});
