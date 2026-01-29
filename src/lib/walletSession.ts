/**
 * Wallet session utilities.
 *
 * IMPORTANT: This intentionally clears both sessionStorage + localStorage keys
 * that ALL wallet providers/connectors use, to prevent unintended auto-
 * reconnection across refreshes or revisits.
 *
 * Covers: MetaMask SDK, Coinbase Wallet SDK, WalletConnect, RainbowKit, wagmi
 */

// Patterns that match wallet SDK storage keys
const WALLET_KEY_PATTERNS = [
  // wagmi / RainbowKit
  'wagmi',
  'rainbowkit',
  'rk-',
  
  // WalletConnect v2
  'wc@',
  'walletconnect',
  'wc_',
  
  // MetaMask SDK
  'metamask',
  'MMSDK',
  '@metamask',
  'mm-sdk',
  
  // Coinbase Wallet SDK
  'coinbase',
  '-walletlink',
  'walletlink',
  'cbw-',
  
  // Safe/Gnosis
  'safe',
  'gnosis',
  
  // Generic patterns
  'wallet',
  'connector',
  'ethereum',
  'web3',
];

function matchesWalletPattern(key: string): boolean {
  const lowerKey = key.toLowerCase();
  return WALLET_KEY_PATTERNS.some(pattern => lowerKey.includes(pattern.toLowerCase()));
}

export function clearWalletSessionData() {
  if (typeof window === 'undefined') return;

  // Clear sessionStorage keys related to wallet connections
  const sessionKeysToRemove: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && matchesWalletPattern(key)) {
      sessionKeysToRemove.push(key);
    }
  }
  sessionKeysToRemove.forEach((key) => sessionStorage.removeItem(key));

  // Also clear any localStorage remnants (from previous sessions or third-party wallets)
  const localKeysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && matchesWalletPattern(key)) {
      localKeysToRemove.push(key);
    }
  }
  localKeysToRemove.forEach((key) => localStorage.removeItem(key));

  // Clear IndexedDB databases used by wallet SDKs (best-effort)
  if (typeof indexedDB !== 'undefined') {
    const dbNames = [
      'WALLET_CONNECT_V2_INDEXED_DB',
      'WalletConnect',
      'coinbaseWallet',
      'MetaMaskSDK',
    ];
    dbNames.forEach((dbName) => {
      try {
        indexedDB.deleteDatabase(dbName);
      } catch {
        // Ignore errors - database might not exist
      }
    });
  }
}
