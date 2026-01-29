import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'World of Underva',
  projectId: '9da853ddca1e91febc374f3ad300afe9',
  chains: [mainnet, base],
  ssr: false,
});
