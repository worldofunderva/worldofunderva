import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';

/**
 * World of Underva — Wagmi Configuration (no Privy)
 * Native connectors only. Base chain exclusively.
 */
export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'World of Underva' }),
  ],
  transports: {
    [base.id]: http(undefined, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10000,
    }),
  },
});
