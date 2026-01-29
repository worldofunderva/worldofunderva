import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const networks = [
  { 
    chain: mainnet, 
    name: 'Ethereum', 
    color: 'bg-amber-500',
    icon: '⟠'
  },
  { 
    chain: base, 
    name: 'Base', 
    color: 'bg-blue-500',
    icon: '🔵'
  },
];

interface NetworkSwitcherProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function NetworkSwitcher({ variant = 'compact', className }: NetworkSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  const currentNetwork = networks.find(n => n.chain.id === chainId) || networks[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNetworkSwitch = (chainId: number) => {
    switchChain?.({ chainId });
    setIsOpen(false);
  };

  if (!isConnected) return null;

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-secondary/50 border border-border/50",
          "hover:bg-secondary hover:border-border",
          "transition-all duration-200",
          "text-sm font-medium",
          isPending && "opacity-50 cursor-wait"
        )}
      >
        <span className={cn("h-2.5 w-2.5 rounded-full", currentNetwork.color)} />
        {variant === 'full' && (
          <span className="text-foreground">{currentNetwork.name}</span>
        )}
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full right-0 mt-2 z-50",
              "min-w-[160px] rounded-lg",
              "bg-popover border border-border",
              "shadow-lg shadow-background/20",
              "overflow-hidden"
            )}
          >
            <div className="p-1">
              {networks.map((network) => (
                <button
                  key={network.chain.id}
                  onClick={() => handleNetworkSwitch(network.chain.id)}
                  disabled={network.chain.id === chainId || isPending}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md",
                    "text-sm font-medium text-left",
                    "transition-colors duration-150",
                    network.chain.id === chainId
                      ? "bg-primary/10 text-primary cursor-default"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  <span className={cn("h-2.5 w-2.5 rounded-full", network.color)} />
                  <span>{network.name}</span>
                  {network.chain.id === chainId && (
                    <span className="ml-auto text-xs text-muted-foreground">Connected</span>
                  )}
                </button>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-border bg-secondary/30">
              <p className="text-xs text-muted-foreground">
                Switch networks to interact with different chains
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
