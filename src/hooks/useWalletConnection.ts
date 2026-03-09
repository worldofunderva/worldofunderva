import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useDisconnect } from 'wagmi';
import { clearWalletSessionData } from '@/lib/walletSession';

/**
 * Hook that provides wallet connection utilities via Privy.
 * Privy handles the modal UI — we just expose login/logout and address info.
 */
export function useWalletConnection() {
  const { login, logout: privyLogout, authenticated, ready } = usePrivy();
  const { address, isConnected: wagmiConnected, connector } = useAccount();
  const { disconnectAsync, disconnect } = useDisconnect();

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const logout = async () => {
    // Ensure wagmi disconnects and local wallet session artifacts are cleared,
    // so every part of the UI reflects disconnect immediately.
    try {
      if (disconnectAsync) await disconnectAsync();
      else disconnect?.();
    } catch {
      // best-effort
    }

    try {
      clearWalletSessionData();
    } catch {
      // best-effort
    }

    await privyLogout();
  };

  return {
    address,
    isConnected: authenticated && wagmiConnected,
    connector,
    truncatedAddress,
    login,
    logout,
    ready,
  };
}

