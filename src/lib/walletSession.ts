/**
 * Wallet session utilities.
 *
 * IMPORTANT: This intentionally clears both sessionStorage + localStorage keys
 * that ALL wallet providers/connectors use, to prevent unintended auto-
 * reconnection across refreshes or revisits.
 *
 * Covers: MetaMask SDK, Coinbase Wallet SDK, WalletConnect, wagmi
 */

const SESSION_CONNECTED_AT_KEY = 'underva_wallet_connected_at';
const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

// Patterns that match wallet SDK storage keys
const WALLET_KEY_PATTERNS = [
  'wagmi',
  'wc@', 'walletconnect', 'wc_',
  'metamask', 'MMSDK', '@metamask', 'mm-sdk',
  'coinbase', '-walletlink', 'walletlink', 'cbw-',
  'safe', 'gnosis',
  'wallet', 'connector', 'ethereum', 'web3',
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

  // Clear connection timestamp
  sessionStorage.removeItem(SESSION_CONNECTED_AT_KEY);

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

/** Record the moment the wallet connected (call once on connect). */
export function setConnectedTimestamp() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_CONNECTED_AT_KEY, Date.now().toString());
}

/** Returns ms remaining before session expires, or 0 if already expired / no timestamp. */
export function getSessionTimeRemaining(): number {
  if (typeof window === 'undefined') return 0;
  const raw = sessionStorage.getItem(SESSION_CONNECTED_AT_KEY);
  if (!raw) return 0;
  const connectedAt = parseInt(raw, 10);
  if (isNaN(connectedAt)) return 0;
  const remaining = SESSION_TIMEOUT_MS - (Date.now() - connectedAt);
  return Math.max(0, remaining);
}
