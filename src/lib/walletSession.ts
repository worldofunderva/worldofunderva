/**
 * Wallet session utilities.
 *
 * IMPORTANT: This intentionally clears both sessionStorage + localStorage keys
 * that common wallet providers/connectors use, to prevent unintended auto-
 * reconnection across refreshes or revisits.
 */

export function clearWalletSessionData() {
  if (typeof window === 'undefined') return;

  // Clear sessionStorage keys related to wagmi/wallet connections
  const sessionKeysToRemove: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (
      key &&
      (key.startsWith('wagmi') ||
        key.startsWith('wc@') ||
        key.startsWith('walletconnect') ||
        key.includes('wallet') ||
        key.includes('connector'))
    ) {
      sessionKeysToRemove.push(key);
    }
  }
  sessionKeysToRemove.forEach((key) => sessionStorage.removeItem(key));

  // Also clear any localStorage remnants (from previous sessions or third-party wallets)
  const localKeysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key &&
      (key.startsWith('wagmi') ||
        key.startsWith('wc@') ||
        key.startsWith('walletconnect') ||
        key.includes('wallet') ||
        key.includes('connector'))
    ) {
      localKeysToRemove.push(key);
    }
  }
  localKeysToRemove.forEach((key) => localStorage.removeItem(key));
}
