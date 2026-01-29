import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base } from 'wagmi/chains';
import { createStorage } from 'wagmi';

/**
 * Use sessionStorage for wagmi state.
 * - Persists during the tab session (WalletConnect needs this for relay communication)
 * - Clears automatically when tab/browser closes
 * - Combined with useWalletSessionPolicy force-disconnect on mount = no auto-reconnect
 */
const sessionStorageConfig = createStorage({
  storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
});

export const config = getDefaultConfig({
  appName: 'World of Underva',
  projectId: 'b8b0d345dc3ec1a6f26d12331973af0f',
  chains: [mainnet, base],
  ssr: false,
  storage: sessionStorageConfig,
});
