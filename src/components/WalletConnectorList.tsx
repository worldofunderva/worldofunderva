import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X } from 'lucide-react';
import type { Connector } from 'wagmi';

const CONNECTOR_META: Record<string, { label: string; icon: string }> = {
  injected: { label: 'MetaMask', icon: '🦊' },
  metaMask: { label: 'MetaMask', icon: '🦊' },
  coinbaseWalletSDK: { label: 'Coinbase Wallet', icon: '🔵' },
  walletConnect: { label: 'WalletConnect', icon: '🔗' },
};

function getConnectorInfo(connector: Connector) {
  const meta = CONNECTOR_META[connector.id] || CONNECTOR_META[connector.name?.toLowerCase() ?? ''];
  return meta || { label: connector.name || connector.id, icon: '💼' };
}

interface WalletConnectorListProps {
  connectors: readonly Connector[];
  onSelect: (connector: Connector) => void;
  onClose: () => void;
  isPending: boolean;
}

export function WalletConnectorList({ connectors, onSelect, onClose, isPending }: WalletConnectorListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Deduplicate connectors by id
  const unique = connectors.reduce<Connector[]>((acc, c) => {
    if (!acc.find(x => x.id === c.id)) acc.push(c);
    return acc;
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-primary/15 bg-background/95 backdrop-blur-xl shadow-xl shadow-background/30 overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-primary/10">
        <span className="text-xs font-semibold text-muted-foreground">Select Wallet</span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-1.5 space-y-0.5">
        {unique.map((connector) => {
          const info = getConnectorInfo(connector);
          return (
            <button
              key={connector.id}
              onClick={() => onSelect(connector)}
              disabled={isPending}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
              <span className="text-lg">{info.icon}</span>
              <span>{info.label}</span>
            </button>
          );
        })}
      </div>
      <div className="px-3 py-2 border-t border-primary/10">
        <p className="text-[10px] text-muted-foreground text-center">Base Network Only</p>
      </div>
    </motion.div>
  );
}