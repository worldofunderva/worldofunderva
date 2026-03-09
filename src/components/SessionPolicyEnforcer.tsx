import { useWalletSessionPolicy } from '@/hooks/useWalletSessionPolicy';

/**
 * Invisible component that enforces wallet session policies:
 * - Disconnect on page refresh
 * - Auto-disconnect after 1 hour
 */
export function SessionPolicyEnforcer() {
  useWalletSessionPolicy();
  return null;
}
