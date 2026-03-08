import { usePrivy } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';

/**
 * Hook that provides wallet connection utilities via Privy.
 * Privy handles the modal UI — we just expose login/logout and address info.
 */
export function useWalletConnection() {
  const { login, logout, authenticated, ready } = usePrivy();
  const { address, isConnected, connector } = useAccount();

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return {
    address,
    isConnected: authenticated && isConnected,
    connector,
    truncatedAddress,
    login,
    logout,
    ready,
  };
}
