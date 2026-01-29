import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'World of Underva',
  projectId: 'b8b0d345dc3ec1a6f26d12331973af0f',
  chains: [mainnet, base],
  ssr: false,
});
