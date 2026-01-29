import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base } from 'wagmi/chains';
import { createStorage } from 'wagmi';

// Ephemeral in-memory storage: disconnects on refresh/navigation.
function createEphemeralStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(map.keys())[index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  } as Storage;
}

const ephemeralStorageConfig = createStorage({
  storage: typeof window !== 'undefined' ? createEphemeralStorage() : undefined,
});

export const config = getDefaultConfig({
  appName: 'World of Underva',
  projectId: 'b8b0d345dc3ec1a6f26d12331973af0f',
  chains: [mainnet, base],
  ssr: false,
  storage: ephemeralStorageConfig,
});
