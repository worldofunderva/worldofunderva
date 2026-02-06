import { useState, useRef, useEffect } from 'react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import { useAccount, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Base only for NFT minting
export const supportedNetworks = [
  { 
    chain: base, 
    name: 'Base', 
    color: 'bg-blue-500',
    icon: '🔵'
  },
];

export const supportedChainIds = supportedNetworks.map(n => n.chain.id);

interface NetworkSwitcherProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function NetworkSwitcher({ variant = 'compact', className }: NetworkSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Use useAccount().chainId to get the wallet's ACTUAL network, not app's configured chain
  const { isConnected, chainId: walletChainId } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  const currentNetwork = supportedNetworks.find(n => n.chain.id === walletChainId);
  const isUnsupportedNetwork = isConnected && !currentNetwork;

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

  const handleNetworkSwitch = async (targetChainId: number) => {
    if (!switchChain) return;
    
    try {
      await switchChain({ chainId: targetChainId });
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to switch network:', err);
    }
  };

  if (!isConnected) return null;

  // Show warning state for unsupported networks
  if (isUnsupportedNetwork) {
    return (
      <div ref={dropdownRef} className={cn("relative", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg",
            "bg-destructive/10 border border-destructive/50",
            "hover:bg-destructive/20 hover:border-destructive",
            "transition-all duration-200",
            "text-sm font-medium",
            isPending && "opacity-50 cursor-wait"
          )}
        >
          <AlertTriangle className="h-4 w-4 text-destructive" />
          {variant === 'full' && (
            <span className="text-destructive">Wrong Network</span>
          )}
          <ChevronDown className={cn(
            "h-4 w-4 text-destructive transition-transform duration-200",
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
                "min-w-[200px] rounded-lg",
                "bg-popover border border-border",
                "shadow-lg shadow-background/20",
                "overflow-hidden"
              )}
            >
              <div className="px-3 py-2 border-b border-border bg-destructive/5">
                <p className="text-xs text-destructive font-medium">
                  Please switch to a supported network
                </p>
              </div>
              <div className="p-1">
                {supportedNetworks.map((network) => (
                  <button
                    key={network.chain.id}
                    onClick={() => handleNetworkSwitch(network.chain.id)}
                    disabled={isPending}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md",
                      "text-sm font-medium text-left",
                      "transition-colors duration-150",
                      "text-foreground hover:bg-secondary",
                      isPending && "opacity-50 cursor-wait"
                    )}
                  >
                    <span className={cn("h-2.5 w-2.5 rounded-full", network.color)} />
                    <span>Switch to {network.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

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
        <span className={cn("h-2.5 w-2.5 rounded-full", currentNetwork?.color)} />
        {variant === 'full' && (
          <span className="text-foreground">{currentNetwork?.name}</span>
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
              {supportedNetworks.map((network) => (
                <button
                  key={network.chain.id}
                  onClick={() => handleNetworkSwitch(network.chain.id)}
                  disabled={network.chain.id === walletChainId || isPending}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md",
                    "text-sm font-medium text-left",
                    "transition-colors duration-150",
                    network.chain.id === walletChainId
                      ? "bg-primary/10 text-primary cursor-default"
                      : "text-foreground hover:bg-secondary",
                    isPending && "opacity-50 cursor-wait"
                  )}
                >
                  <span className={cn("h-2.5 w-2.5 rounded-full", network.color)} />
                  <span>{network.name}</span>
                  {network.chain.id === walletChainId && (
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
